package ovh.wiktormalyska.backend.security;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {


    private final String jwtSecret;

    public JwtTokenProvider() {
        Dotenv dotenv = Dotenv.configure().load();
        jwtSecret = dotenv.get("JWT_SECRET");
    }

    public String generateToken(Authentication authentication, Long userID) {
        String username = authentication.getName();
        Collection<String> authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        Map<String, Object> info = new HashMap<>();
        info.put("authorities", authorities);
        info.put("userID", userID);

        Date currentDate = new Date();
        long jwtExpirationDate = 3600000;//1h
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

