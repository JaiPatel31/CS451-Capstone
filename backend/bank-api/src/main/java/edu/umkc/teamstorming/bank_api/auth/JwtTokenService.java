package edu.umkc.teamstorming.bank_api.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtTokenService {

    private final SecretKey key;
    private final String issuer;
    private final long expMinutes;

    public JwtTokenService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.issuer:bank-api}") String issuer,
            @Value("${jwt.expMinutes:60}") long expMinutes
    ) {
        // HS256 needs a sufficiently long secret
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.issuer = issuer;
        this.expMinutes = expMinutes;
    }

    public String issueToken(String email) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expMinutes * 60_000);

        return Jwts.builder()
                .issuer(issuer)
                .subject(email)              // store email as the "sub"
                .issuedAt(now)
                .expiration(exp)
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public String validateAndGetEmail(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .requireIssuer(issuer)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return claims.getSubject(); // email
        } catch (JwtException | IllegalArgumentException e) {
            return null; // invalid/expired
        }
    }
}
