package com.rmit.sept.thurs1830.group6.backend.web;

import com.rmit.sept.thurs1830.group6.backend.model.User;
import com.rmit.sept.thurs1830.group6.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user, BindingResult result){

        if(result.hasErrors()){
            Map<String, String> errorMap = new HashMap<>();

            for(FieldError error : result.getFieldErrors()) {
                return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
            }
        }

        if(!user.getPassword().matches(user.getConfirm_password())){
            return new ResponseEntity<String>("Passwords do not match.", HttpStatus.BAD_REQUEST);
        }

        User user1 = userService.savedOrUpdatedUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);


    }
}
