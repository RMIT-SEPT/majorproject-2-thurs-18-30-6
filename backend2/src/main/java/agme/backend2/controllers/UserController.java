package agme.backend2.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.User;
import agme.backend2.services.UserService;

@RestController
@CrossOrigin (origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> userMap){
		String firstName = (String) userMap.get("firstName");
        String lastName = (String) userMap.get("lastName");
        String email = (String) userMap.get("email");
        String password = (String) userMap.get("password");
        String confirmPassword = (String) userMap.get("confirm_password");
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
	
	@PostMapping("/getAvailability")
	public ResponseEntity<?> getAvailability(@RequestBody Map<String, Object> userMap){
		String timeslot = (String) userMap.get("timeslot");
		String email = (String) userMap.get("email");
        String availability = userService.getAvailability(email, timeslot);
        return new ResponseEntity<>(availability,HttpStatus.OK);
	}
	
	@PostMapping("/setAvailability")
	public ResponseEntity<?> setAvailability(@RequestBody Map<String, Object> userMap){
		String timeslot = (String) userMap.get("timeslot");
		String email = (String) userMap.get("email");
        String availability = (String) userMap.get("availability");
        userService.setAvailability(email, timeslot, availability);
        return new ResponseEntity<>(availability,HttpStatus.CREATED);
	}
	
	@PostMapping("/getService")
	public ResponseEntity<?> getService(@RequestBody Map<String, Object> userMap){
		String service = (String) userMap.get("service");
		String email = (String) userMap.get("email");
        String availability = userService.getService(email, service);
        return new ResponseEntity<>(availability,HttpStatus.OK);
	}
	
	@PostMapping("/setService")
	public ResponseEntity<?> setService(@RequestBody Map<String, Object> userMap){
		String service = (String) userMap.get("service");
		String email = (String) userMap.get("email");
        String availability = (String) userMap.get("availability");
        userService.setService(email, service, availability);
        return new ResponseEntity<>(availability,HttpStatus.CREATED);
	}
}
