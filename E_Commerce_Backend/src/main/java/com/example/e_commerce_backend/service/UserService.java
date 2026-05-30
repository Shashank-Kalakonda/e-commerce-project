package com.example.e_commerce_backend.service;

import com.example.e_commerce_backend.dto.UserDTO;
import com.example.e_commerce_backend.entity.User;
import com.example.e_commerce_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // CREATE (INSERT)
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // READ ALL
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // READ BY ID
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // UPDATE
    public User updateUser(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser != null) {
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            return userRepository.save(existingUser);
        }

        return null;
    }

    // DELETE
    public String deleteUser(Long id) {
        userRepository.deleteById(id);
        return "User deleted successfully";
    }

    public UserDTO getUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(user.getId(), user.getName(), user.getEmail());

    }
}