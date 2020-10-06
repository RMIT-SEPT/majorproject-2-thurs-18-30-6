package agme.backend2.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.Booking;
import agme.backend2.models.User;
import agme.backend2.models.WorkerAvailability;
import agme.backend2.services.ManagementService;
import agme.backend2.services.UserService;

@RestController
@CrossOrigin (origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
	@Autowired
	UserService userService;
	
	@Autowired
	ManagementService managementService;

	//Registering a user of role customer into the database
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
	//Registering a user of role admin into the database
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
	//Registering user of role worker by admin into the database
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
	//uses validateUser method to query from the database, if found, return the status that a user is found with
	//that specific name and password
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String, Object> userMap){
		String email = (String) userMap.get("username");
        String password = (String) userMap.get("password");
        User user = userService.validateUser(email, password);
        return new ResponseEntity<>(user,HttpStatus.CREATED);		
	}

	//function to find all workers under the specific admin id
	@PostMapping("/getworker/{adminId}")
	public ResponseEntity<?> getWorkerFromAdmin(@PathVariable Integer adminId){
		List<User> worker = new ArrayList<User>();
		worker = managementService.getAllWorkerFromAdmin(adminId);
		return new ResponseEntity<>(worker,HttpStatus.OK);
	}

	//function to get all worker availability for worker
	@PostMapping("/getAvailability")
	public ResponseEntity<?> getAvailability(@RequestBody Map<String, Object> userMap){
		String username = (String) userMap.get("username");
		String timeslot = (String) userMap.get("timeslot");
        String availability = userService.getAvailability(username, timeslot);
        return new ResponseEntity<>(availability,HttpStatus.OK);
	}

	//function to set availability of the worker
	@PostMapping("/setAvailability")
	public ResponseEntity<?> setAvailability(@RequestBody Map<String, Object> userMap){
		String username = (String) userMap.get("username");
		String timeslot = (String) userMap.get("timeslot");
        String availability = (String) userMap.get("availability");
        userService.setAvailability(username, timeslot, availability);
        return new ResponseEntity<>(availability,HttpStatus.CREATED);
	}

	//function to get shift for the specific worker
	@PostMapping("/getShift")
	public ResponseEntity<?> getShift(@RequestBody Map<String, Object> userMap){
		Integer userId = (Integer) userMap.get("userId");
        List<String> assigned = userService.getAssigned(userId);
        return new ResponseEntity<>(assigned,HttpStatus.OK);
	}

	//function to set a shift for a specific worker
	@PostMapping("/setShift")
	public ResponseEntity<?> setShift(@RequestBody Map<String, Object> userMap){
		Integer userId = (Integer) userMap.get("userId");
		String timeslot = (String) userMap.get("timeslot");
        Boolean assigned = (Boolean) userMap.get("assigned");
        userService.setAssigned(userId, timeslot, assigned);
        return new ResponseEntity<>(assigned,HttpStatus.CREATED);
	}

	//function to get all services provided by an admin
	@PostMapping("/checkService")
	public ResponseEntity<?> checkService(@RequestBody Map<String, Object> userMap){
		Integer adminId = (Integer) userMap.get("adminId");
		String service = (String) userMap.get("service");
        String availability = userService.getService(adminId, service);
        return new ResponseEntity<>(availability,HttpStatus.OK);
	}
	
	//function to get all services provided by an admin
	@PostMapping("/getServices")
	public ResponseEntity<?> getServices(@RequestBody Map<String, Object> userMap){
		Integer adminId = (Integer) userMap.get("adminId");
        List<String> services = userService.getAllServices(adminId);
        return new ResponseEntity<>(services,HttpStatus.OK);
	}

	//function to set services by admin 
	@PostMapping("/setService")
	public ResponseEntity<?> setService(@RequestBody Map<String, Object> userMap){
		Integer adminId = (Integer) userMap.get("adminId");
		String service = (String) userMap.get("service");
        String availability = (String) userMap.get("availability");
        String description = (String) userMap.get("description");
        userService.setService(adminId, service, availability,description);
        return new ResponseEntity<>(availability,HttpStatus.CREATED);
	}
	
	//function to get an adminId from a company name
	@PostMapping("/getAdminId")
	public ResponseEntity<?> getAdminId(@RequestBody Map<String, Object> userMap){
		String company = (String) userMap.get("company");
        Integer adminId = userService.getAdminId(company);
        return new ResponseEntity<>(adminId,HttpStatus.OK);
	}

	//function to get all companies
	@PostMapping("/getAllCompanies")
	public ResponseEntity<?> getAllCompanies(){
        List<String> companies = userService.getAllCompanies();
        return new ResponseEntity<>(companies,HttpStatus.OK);
	}


	//function to get all bookings of a customer or worker
	@PostMapping("/getBookings")
	public ResponseEntity<?> getBookings(@RequestBody Map<String, Object> userMap){
		Integer userId = (Integer) userMap.get("userId");
		List<Booking> bookings = userService.getBookings(userId);
        return new ResponseEntity<>(bookings,HttpStatus.OK);
	}

	//function to create a booking
	@PostMapping("/createBooking")
	public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> userMap){
		Integer workerId = (Integer) userMap.get("workerId");
		Integer customerId = (Integer) userMap.get("customerId");
		String timeslot = (String) userMap.get("timeslot");
		Date date = (Date) userMap.get("date");
		Booking booking = userService.createBooking(workerId, customerId, timeslot, date);
        return new ResponseEntity<>(booking,HttpStatus.CREATED);
	}
	
	//function to cancel a booking
	@PostMapping("/cancelBooking")
	public ResponseEntity<?> cancelBooking(@RequestBody Map<String, Object> userMap){
		Integer bookingId = (Integer) userMap.get("bookingId");
		userService.cancelBooking(bookingId);
        return new ResponseEntity<>(bookingId,HttpStatus.CREATED);
	}
}
