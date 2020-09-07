package com.rmit.sept.thurs1830.group6.backend.service;

import com.rmit.sept.thurs1830.group6.backend.model.User;
import com.rmit.sept.thurs1830.group6.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User savedOrUpdatedUser(User user){

        //business logic

        return userRepository.save(user);
    }
}
