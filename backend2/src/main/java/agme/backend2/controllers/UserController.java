package agme.backend2.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.User;
import agme.backend2.models.WorkerAvailability;
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
        Integer adminId = (Integer) userMap.get("adminId");
        User newUser = userService.registerWorker(firstName,lastName,username,password,confirmPassword,address,phone,role,adminId);
		return new ResponseEntity<>(newUser,HttpStatus.CREATED);
	}
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String, Object> userMap){
		String username = (String) userMap.get("username");
        String password = (String) userMap.get("password");
        User user = userService.validateUser(username, password);
        return new ResponseEntity<>(user,HttpStatus.CREATED);
		
	}
	
	@PostMapping("/getAvailability")
	public ResponseEntity<?> getAvailability(@RequestBody Map<String, Object> userMap){
		String username = (String) userMap.get("username");
		String timeslot = (String) userMap.get("timeslot");
        String availability = userService.getAvailability(username, timeslot);
        return new ResponseEntity<>(availability,HttpStatus.OK);
	}
	
	@PostMapping("/setAvailability")
	public ResponseEntity<?> setAvailability(@RequestBody Map<String, Object> userMap){
		String username = (String) userMap.get("username");
		String timeslot = (String) userMap.get("timeslot");
        String availability = (String) userMap.get("availability");
        userService.setAvailability(username, timeslot, availability);
        return new ResponseEntity<>(availability,HttpStatus.CREATED);
	}
	
	@PostMapping("/getShift")
	public ResponseEntity<?> getShift(@RequestBody Map<String, Object> userMap){
		Integer userId = (Integer) userMap.get("userId");
        List<WorkerAvailability> assigned = userService.getAssigned(userId);
        return new ResponseEntity<>(assigned,HttpStatus.OK);
	}
	
	@PostMapping("/setShift")
	public ResponseEntity<?> setShift(@RequestBody Map<String, Object> userMap){
		Integer userId = (Integer) userMap.get("userId");
		String timeslot = (String) userMap.get("timeslot");
        Boolean assigned = (Boolean) userMap.get("assigned");
        userService.setAssigned(userId, timeslot, assigned);
        return new ResponseEntity<>(assigned,HttpStatus.CREATED);
	}
	
	@PostMapping("/getService")
	public ResponseEntity<?> getService(@RequestBody Map<String, Object> userMap){
		String username = (String) userMap.get("username");
		String service = (String) userMap.get("service");
        String availability = userService.getService(username, service);
        return new ResponseEntity<>(availability,HttpStatus.OK);
	}
	
	@PostMapping("/setService")
	public ResponseEntity<?> setService(@RequestBody Map<String, Object> userMap){
		String username = (String) userMap.get("username");
		String service = (String) userMap.get("service");
        String availability = (String) userMap.get("availability");
        userService.setService(username, service, availability);
        return new ResponseEntity<>(availability,HttpStatus.CREATED);
	}
}
