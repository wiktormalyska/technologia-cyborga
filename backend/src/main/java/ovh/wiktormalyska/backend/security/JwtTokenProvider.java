package ovh.wiktormalyska.backend.security;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
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

        User user = userRepository.findByUsername(username).orElseThrow();
        Set<Role> userRoles = user.getRoles();
        info.put("userRoles", userRoles);

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

    public Cookie createJwtCookie(String token) {
        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(3600);     // 1h
        return cookie;
    }

    private Key key() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getUsername(String token){
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token){
        Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parse(token);
        return true;
    }
}

