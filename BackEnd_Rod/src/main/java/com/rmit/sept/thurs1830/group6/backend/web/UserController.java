package com.rmit.sept.thurs1830.group6.backend.web;

import com.rmit.sept.thurs1830.group6.backend.model.User;
import com.rmit.sept.thurs1830.group6.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.mindrot.jbcrypt.BCrypt;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/user")
public class UserController {

    String salt = BCrypt.gensalt();

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody User user, BindingResult result){

        // IF there were errors return bad request
        if(result.hasErrors()){
            Map<String, String> errorMap = new HashMap<>();

            for(FieldError error : result.getFieldErrors()) {
                return new ResponseEntity<List<FieldError>>(result.getFieldErrors(), HttpStatus.BAD_REQUEST);
            }
        }

        // ELSE IF passwords do not match return bad request
        if(!user.getPassword().matches(user.getConfirm_password())){
            return new ResponseEntity<String>("Passwords do not match.", HttpStatus.BAD_REQUEST);
        }

        // ELSE store in database, and return created
        String hashedPass = BCrypt.hashpw(user.getPassword(), salt);
        user.setPassword(hashedPass);
        user.setConfirm_password(hashedPass);

        User user1 = userService.registerUser(user);
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> logInUser(@RequestBody Map<String, Object> userMap){
        // Get email and password from post request
        String email = userMap.get("email").toString();
        String passFromMap = userMap.get("password").toString();

        String password = BCrypt.hashpw(passFromMap, salt);

        // Send email and password to user service
        User user = userService.loginUser(email, password);

        // If NULL, user does not exist
        if(user == null){
            return new ResponseEntity<String>("Email or password was incorrect", HttpStatus.BAD_REQUEST);
        }

        // ELSE return correct
        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }
}
