package agme.backend2;

import static org.junit.jupiter.api.Assertions.*;

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
class Backend2ApplicationTests {
	
	@Autowired
    UserService userService;
	User validUser;
	
	@BeforeEach
	void init() {
		userService.deleteAll();
    	userService.registerUser("fname", "lname", "test1", "password", "password", "Worker");
	}
	
	@AfterEach
	void clearRepository() {
		userService.deleteAll();
	}
	
	@Test
	void registerUser(){
    	userService.registerUser("fname", "lname", "registertest", "password", "password", "Worker");
	}
	
	@Test
	void validateUserSuccess(){
    	validUser = userService.validateUser("test1", "password");
    	assertEquals("fname", validUser.getFirstName());
	}
	
	@Test
	void validateUserFail(){
		Assertions.assertThrows(NullPointerException.class, () -> {
			validUser = userService.validateUser("nothing", "password");
			validUser.getUserId();
		});
	}
        
    @Test
    void uniqueId(){
    	userService.registerUser("fname", "lname", "test2", "password", "password", "Worker");
    	assertNotEquals(userService.validateUser("test1", "password").getUserId(), 
    			userService.validateUser("test2", "password").getUserId());
    }

	@Test
	void checkConfirmPasswordSuccess(){
		userService.registerUser("fname", "lname", "confirm", "password", "password", "Worker");
	}
	
	@Test
	void checkConfirmPasswordFailure(){
		Assertions.assertThrows(ValidationException.class, () -> {
			userService.registerUser("fname", "lname", "confirm2", "password", "password2", "Worker");
		});
	}
	
	@Test
	void checkDuplicateUsernameSuccess(){
		userService.registerUser("fname", "lname", "duplicate", "password", "password", "Worker");
	}
	
	@Test
	void checkDuplicateUsernameFailure(){
		Assertions.assertThrows(ValidationException.class, () -> {
			userService.registerUser("fname", "lname", "test1", "password", "password", "Worker");
		});
	}
	
	@Test
	void setAvailabilitySuccess(){
		userService.setAvailability("test1", "Monday", "Available");
	}
	
	@Test
	void getAvailabilitySuccess(){
		String availability = userService.getAvailability("test1", "Monday");
		assertEquals("Unavailable", availability);
	}
	
	@Test
	void createAvailabilitySuccess(){
		userService.setAvailability("test1", "Cheeseday", "Unavailable");
		String availability = userService.getAvailability("test1", "Cheeseday");
		assertEquals("Unavailable", availability);
	}
	
	@Test
	void setServiceSuccess(){
		userService.setService("test1", "Eating", "Available");
	}
	
	@Test
	void getServiceSuccess(){
		String availability = userService.getService("test1", "Eating");
		assertEquals("Unavailable", availability);
	}
	
	@Test
	void createServiceSuccess(){
		userService.setAvailability("test1", "Burger", "Unavailable");
		String availability = userService.getAvailability("test1", "Burger");
		assertEquals("Unavailable", availability);
	}
	
	@Test
	void contextLoads() {
	}

}