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
class BookingTests {
	
	@Autowired
    UserService userService;
	
	@BeforeEach
	void init() {
		
	}
	
	@AfterEach
	void clearRepository() {
		userService.deleteAll();
	}
	
	//Checks if creating a booking calls an exception
	@Test
	void createBooking() {
		
	}
	
	@Test
	void contextLoads() {
	}
	
}