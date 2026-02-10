package edu.umkc.teamstorming.bank_api.security;

import edu.umkc.teamstorming.bank_api.auth.BearerTokenFilter;
import edu.umkc.teamstorming.bank_api.auth.TokenService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, TokenService tokenService) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration cfg = new CorsConfiguration();
                cfg.setAllowedOrigins(List.of(
                        "http://localhost:3000",//local
                    "https://cs-451-capstone.vercel.app/" //prod
                ));
                cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                cfg.setAllowedHeaders(List.of("Authorization", "Content-Type"));
                cfg.setAllowCredentials(false);
                return cfg;
            }))
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/auth/me").authenticated()
                //protect  API
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
            )
            //not using Spring's username/password auth yet:
            .httpBasic(Customizer.withDefaults());

        http.addFilterBefore(new BearerTokenFilter(tokenService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
