package agme.backend2.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.User;
import agme.backend2.services.UserService;

@RestController
@CrossOrigin
public class UserController {
	@Autowired
	UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> userMap){
		String firstName = (String) userMap.get("firstName");
        String lastName = (String) userMap.get("lastName");
        String email = (String) userMap.get("email");
        String password = (String) userMap.get("password");
        String confirmPassword = (String) userMap.get("confirmPassword");
        String role = (String) userMap.get("role");
        User newUser = userService.registerUser(firstName,lastName,email,password,confirmPassword,role);
		return new ResponseEntity<>(newUser,HttpStatus.CREATED);
	}
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String, Object> userMap){
		String email = (String) userMap.get("email");
        String password = (String) userMap.get("password");
        User user = userService.validateUser(email, password);
        return new ResponseEntity<>(user,HttpStatus.CREATED);
		
	}
}
