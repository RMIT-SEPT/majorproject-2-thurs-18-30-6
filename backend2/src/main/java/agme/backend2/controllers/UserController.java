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
public class UserController {
	@Autowired
	UserService userService;
	
	@PostMapping("/register/customer")
	public ResponseEntity<?> registerCustomer(@RequestBody Map<String, Object> userMap){
		String firstName = (String) userMap.get("firstName");
        String lastName = (String) userMap.get("lastName");
        String username = (String) userMap.get("username");
        String password = (String) userMap.get("password");
        String confirmPassword = (String) userMap.get("confirmPassword");
        String address = (String) userMap.get("address");
        String phone = (String) userMap.get("phone");
        String role = (String) userMap.get("role");
        User newUser = userService.registerCustomer(firstName,lastName,username,password,confirmPassword,address,phone,role);
		return new ResponseEntity<>(newUser,HttpStatus.CREATED);
	}
	@PostMapping("/register/admin")
	public ResponseEntity<?> registerAdmin(@RequestBody Map<String, Object> userMap){
		String firstName = (String) userMap.get("firstName");
        String lastName = (String) userMap.get("lastName");
        String username = (String) userMap.get("username");
        String password = (String) userMap.get("password");
        String confirmPassword = (String) userMap.get("confirmPassword");
        String company = (String)userMap.get("company");
        String address = (String) userMap.get("address");
        String phone = (String) userMap.get("phone");
        String role = (String) userMap.get("role");
        User newUser = userService.registerAdmin(firstName,lastName,username,password,confirmPassword,company,address,phone,role);
		return new ResponseEntity<>(newUser,HttpStatus.CREATED);
	}
	@PostMapping("/register/worker")
	public ResponseEntity<?> registerWorker(@RequestBody Map<String, Object> userMap){
		String firstName = (String) userMap.get("firstName");
        String lastName = (String) userMap.get("lastName");
        String username = (String) userMap.get("username");
        String password = (String) userMap.get("password");
        String confirmPassword = (String) userMap.get("confirmPassword");
        String address = (String) userMap.get("address");
        String phone = (String) userMap.get("phone");
        String role = (String) userMap.get("role");
        String adminId = (String) userMap.get("adminId");
        User newUser = userService.registerWorker(firstName,lastName,username,password,confirmPassword,address,phone,role,adminId);
		return new ResponseEntity<>(newUser,HttpStatus.CREATED);
	}
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String, Object> userMap){
		String email = (String) userMap.get("username");
        String password = (String) userMap.get("password");
        User user = userService.validateUser(email, password);
        return new ResponseEntity<>(user,HttpStatus.CREATED);
		
	}
}
