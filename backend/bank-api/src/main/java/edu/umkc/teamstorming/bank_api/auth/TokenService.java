package edu.umkc.teamstorming.bank_api.auth;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenService {
    private final Map<String, String> tokenToEmail = new ConcurrentHashMap<>();

    public String issueToken(String email) {
        String token = UUID.randomUUID().toString();
        tokenToEmail.put(token, email);
        return token;
    }

    public String validateAndGetEmail(String token) {
        return tokenToEmail.get(token); // null if invalid
    }
}

