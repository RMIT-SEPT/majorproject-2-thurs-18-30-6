package agme.backend2;

import static org.junit.jupiter.api.Assertions.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.Booking;
import agme.backend2.models.Timeslot;
import agme.backend2.models.User;
import agme.backend2.services.UserService;

@SpringBootTest
class BookingTests {
	
	@Autowired
    UserService userService;
	
	User validAdmin;
	User validWorker;
	User validCustomer;
	
	ObjectMapper mapper = new ObjectMapper();
	
	@BeforeEach
	void init() throws ParseException {
		userService.registerAdmin("adminFirstName","adminLastName","adminUsername","adminPassword","adminPassword","adminCompany","adminAddress","adminPhone","admin");
    	validAdmin = userService.validateUser("adminUsername", "adminPassword");
    	userService.registerWorker("workerFirstName", "workerLastName", "workerUsername", "workerPassword", "workerPassword", "workerAddress", "workerPhone",
				"worker", validAdmin.getUserId());
    	validWorker = userService.validateUser("workerUsername", "workerPassword");
    	userService.registerCustomer("fname", "lname", "customerUsername", "customerPassword", "customerPassword", "customerAddress", "customerPhone", "Customer");
    	validCustomer = userService.validateUser("customerUsername", "customerPassword");
    	userService.setAvailability("workerUsername", "Monday", "Available");
    	userService.setShifts(validWorker.getUserId(), "2020-10-10");
	}
	
	@AfterEach
	void clearRepository() {
		userService.deleteAll();
	}
	
	//Checks if creating a booking calls an exception
	@Test
	void createBooking() throws ParseException {
    	userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", "2020-10-10", "Baking");
		
	}
	
	//Checks if getting a booking returns the correct result
	@Test
	void getBooking() throws ParseException, JsonProcessingException {
		Booking booking = userService.createBooking(validWorker.getUserId(), validCustomer.getUserId(), "9-10", "2020-10-10", "Baking");
    	List<Booking> bookings = userService.getBookings(validWorker.getUserId());

    	assertEquals(booking.getBookingId(), bookings.get(0).getBookingId());
	}
	
	@Test
	void contextLoads() {
	}
	
}
