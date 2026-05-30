//package com.example.e_commerce_backend.controller;
//
//import com.example.e_commerce_backend.entity.User;
//import com.example.e_commerce_backend.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/users")

//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//    // CREATE
//    @PostMapping
//    public User createUser(@RequestBody User user) {
//        return userService.createUser(user);
//    }
//
//    // READ ALL
//    @GetMapping
//    public List<User> getAllUsers() {
//        return userService.getAllUsers();
//    }
//
//    // READ BY ID
//    @GetMapping("/{id}")
//    public User getUserById(@PathVariable Long id) {
//        return userService.getUserById(id);
//    }
//
//    // UPDATE
//    @PutMapping("/{id}")
//    public User updateUser(@PathVariable Long id, @RequestBody User user) {
//        return userService.updateUser(id, user);
//    }
//
//    // DELETE
//    @DeleteMapping("/{id}")
//    public String deleteUser(@PathVariable Long id) {
//        return userService.deleteUser(id);
//    }
//
//
//}


package com.example.e_commerce_backend.controller;

import com.example.e_commerce_backend.dto.UserDTO;
import com.example.e_commerce_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/me")
    public UserDTO getMyProfile(Authentication authentication) {

        // GET LOGGED-IN EMAIL FROM JWT
        String email = authentication.getName();

        return userService.getUserByEmail(email);
    }
}