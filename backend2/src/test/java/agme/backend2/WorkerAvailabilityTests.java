package agme.backend2;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.User;
import agme.backend2.services.UserService;

@SpringBootTest
class WorkerAvailabilityTests {
	
	@Autowired
    UserService userService;
	User validUser;
	
	@BeforeEach
	void init() {
		userService.deleteAll();
    	userService.registerAdmin("fname", "lname", "admin", "password", "password", "test company", "address", "phone", "Admin");
    	User admin = userService.validateUser("admin", "password");
    	Integer adminId = admin.getUserId();
    	userService.registerWorker("fname", "lname", "test1", "password", "password", "address", "phone", "Worker", adminId);
	}
	
	@AfterEach
	void clearRepository() {
		userService.deleteAll();
	}
	
	//Check if setting availability passes without exceptions
	@Test
	void setAvailabilitySuccess(){
		userService.setAvailability("test1", "Monday", "Available");
	}
	
	//Check if getting availability returns the correct result
	@Test
	void getAvailabilitySuccess(){
		userService.setAvailability("test1", "Monday", "Available");
		String availability = userService.getAvailability("test1", "Monday");
		assertEquals("Available", availability);
	}
	
	//Check if creating a timeslot creates successfully
	@Test
	void createAvailabilitySuccess(){
		userService.setAvailability("test1", "Cheeseday", "Unavailable");
		String availability = userService.getAvailability("test1", "Cheeseday");
		assertEquals("Unavailable", availability);
	}
	
	//Check if setting shifts passes without exceptions
	@Test
	void setAssignedSuccess(){
		Integer userId = userService.validateUser("test1", "password").getUserId();
		userService.setAvailability("test1", "Monday", "Available");
		userService.setAssigned(userId, "Monday", true);
	}
	
	//Check if getting shifts returns the correct result
	@Test
	void getAssignedSuccess(){
		Integer userId = userService.validateUser("test1", "password").getUserId();
		userService.setAvailability("test1", "Monday", "Available");
		userService.setAssigned(userId, "Monday", true);
		List<String> assigned = userService.getAssigned(userId);
		assertEquals(true, assigned.get(0));
	}
	
	//Check if setting services passes without exceptions
	@Test
	void setServiceSuccess(){
		userService.setService("test1", "Eating", "Available");
	}
	
	//Check if getting services returns the correct result
	@Test
	void getServiceSuccess(){
		userService.setService("test1", "Eating", "Available");
		String availability = userService.getService("test1", "Eating");
		assertEquals("Available", availability);
	}
	
	//Check if creating a service creates successfully
	@Test
	void createServiceSuccess(){
		userService.setAvailability("test1", "Burger", "Unavailable");
		String availability = userService.getAvailability("test1", "Burger");
		assertEquals("Unavailable", availability);
	}
	
	//Check if setting availability for a worker that does not exist throws an exception
	@Test
	void setAvailabilityNoWorker(){
		Assertions.assertThrows(ValidationException.class, () -> {
			userService.setAvailability("nothing", "Monday", "Available");
		});
	}
	
	//Check if getting availability for a worker that does not exist throws an exception
	@Test
	void getAvailabilityNoWorker(){
		Assertions.assertThrows(ValidationException.class, () -> {
			userService.getAvailability("nothing", "Monday");
		});
	}
	
	//Check if getting availability for a timeslot that does not exist throws an exception
	@Test
	void getAvailabilityNoTimeslot(){
		Assertions.assertThrows(ValidationException.class, () -> {
			userService.getAvailability("test1", "Funday");
		});
	}
	
	@Test
	void contextLoads() {
	}

}
