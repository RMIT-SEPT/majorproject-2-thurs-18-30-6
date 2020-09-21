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
    	userService.registerCustomer("fname", "lname", "test1", "password", "password", "address", "phone", "Customer");
	}
	
	@AfterEach
	void clearRepository() {
		userService.deleteAll();
	}
	
	@Test
	void registerAdmin() {
		
	}
	
	@Test
	void registerUser(){
    	userService.registerCustomer("fname", "lname", "registertest", "password", "password", "address", "phone", "Customer");
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
    	userService.registerCustomer("fname", "lname", "test2", "password", "password", "address", "phone", "Customer");
    	assertNotEquals(userService.validateUser("test1", "password").getUserId(), 
    			userService.validateUser("test2", "password").getUserId());
    }
	
	@Test
	void checkConfirmPasswordFailure(){
		Assertions.assertThrows(ValidationException.class, () -> {
	    	userService.registerCustomer("fname", "lname", "test3", "password", "password2", "address", "phone", "Customer");
		});
	}
	
	@Test
	void checkDuplicateUsernameFailure(){
		Assertions.assertThrows(ValidationException.class, () -> {
	    	userService.registerCustomer("fname", "lname", "test1", "password", "password", "address", "phone", "Customer");
		});
	}

	@Test
	void contextLoads() {
	}

}