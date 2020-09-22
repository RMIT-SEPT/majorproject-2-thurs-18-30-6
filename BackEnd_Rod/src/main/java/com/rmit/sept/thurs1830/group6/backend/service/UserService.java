package com.rmit.sept.thurs1830.group6.backend.service;

import com.rmit.sept.thurs1830.group6.backend.model.User;
import com.rmit.sept.thurs1830.group6.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // CREATE new user and SAVE in repository
    public User registerUser(User user){
        return userRepository.save(user);
    }

    // QUERY repository for user and CHECK IF existing
    public User loginUser(String email, String password){
        return userRepository.findByEmailAndPassword(email, password);
    }
}
