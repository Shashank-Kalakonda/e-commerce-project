package com.example.e_commerce_backend.service;

import com.example.e_commerce_backend.dto.LoginRequest;
import com.example.e_commerce_backend.dto.RegisterRequest;
import com.example.e_commerce_backend.entity.User;
import com.example.e_commerce_backend.repository.UserRepository;
import com.example.e_commerce_backend.util.JwtUtil;
import com.example.e_commerce_backend.util.PasswordEncoderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoderUtil passwordEncoder;
    private final JwtUtil jwtUtil;

    // REGISTER
    public String register(RegisterRequest req) {

        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        userRepository.save(user);

        return "User registered successfully";
    }

    // LOGIN
    public String login(LoginRequest req) {

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        if (!passwordEncoder.match(req.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}