package edu.umkc.teamstorming.bank_api.auth;

import edu.umkc.teamstorming.bank_api.user.User;
import edu.umkc.teamstorming.bank_api.user.UserRepository;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtTokenService tokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(JwtTokenService tokenService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public record RegisterRequest(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}

    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String email = request.email().toLowerCase().trim();

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(409).body(Map.of("error", "Email already in use"));
        }

        String hash = passwordEncoder.encode(request.password());
        User user = new User(email, hash);
        userRepository.save(user);

        return ResponseEntity.status(201).body(Map.of("status", "created"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String email = request.email().toLowerCase().trim();

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null || !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        String token = tokenService.issueToken(email);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestAttribute(value = "authedEmail", required = false) String email) {
        if (email == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        return ResponseEntity.ok(Map.of("email", email, "status", "ok"));
    }
}
