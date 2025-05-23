package ovh.wiktormalyska.backend.security;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import ovh.wiktormalyska.backend.model.Role;
import ovh.wiktormalyska.backend.model.User;
import ovh.wiktormalyska.backend.repository.UserRepository;
import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    private final UserRepository userRepository;
    private final String jwtSecret;

    @Autowired
    public JwtTokenProvider(UserRepository userRepository) {
        Dotenv dotenv = Dotenv.configure().load();
        jwtSecret = dotenv.get("JWT_SECRET");
        this.userRepository = userRepository;
    }

    public String generateToken(Authentication authentication, Long userID) {
        String username = authentication.getName();
        Map<String, Object> info = new HashMap<>();
        info.put("userID", userID);

        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new RuntimeException("User not found: " + username)
        );

        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        info.put("userRoles", roleNames);

        Date currentDate = new Date();
        long jwtExpirationDate = 3600000;   // 1h
        Date expirationDate = new Date(currentDate.getTime() + jwtExpirationDate);

        return Jwts.builder()
                .claims(info)
                .subject(username)
                .issuedAt(currentDate)
                .expiration(expirationDate)
                .signWith(key())
                .compact();
    }

    private Key key() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getUsername(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parse(token);
        return true;
    }
}
