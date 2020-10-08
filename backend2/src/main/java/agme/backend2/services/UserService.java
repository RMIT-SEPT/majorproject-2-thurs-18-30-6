package agme.backend2.services;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import agme.backend2.models.Booking;
import agme.backend2.models.Timeslot;
import agme.backend2.models.User;


public interface UserService  {
	User registerCustomer(String firstName, String lastName, String username, String password, String confirmPassword,
			String address, String phone, String role);
	
	User registerAdmin(String firstName, String lastName, String username, String password, String confirmPassword,
			String company, String address, String phone, String role);
	
	User registerWorker(String firstName, String lastName, String username, String password, String confirmPassword,
			String address, String phone, String role, Integer adminId);
	
	User validateUser(String username, String password);
	
	String getAvailability(String username, String timeslot);
	
	void setAvailability(String username, String timeslot, String availability);
	
	List<String> getAssigned(Integer userId);
	
	void setAssigned(Integer userId, String timeslot, Boolean assigned);
	
	List<Timeslot> getShifts(Integer workerId);
	
	void setShifts(Integer workerId, String date) throws ParseException;
	
	String getService(Integer adminId, String service);
	
	List<String> getAllServices(Integer adminId);
	
	void setService(Integer adminId, String service, String availability, String description);
	
	void deleteAll();
	
	Integer getAdminId(String company);
	
	List<String> getAllCompanies();
	
	String getDescription(Integer adminId, String service);
	
	List<Booking> getBookings(Integer userId);
	
	Booking createBooking(Integer workerId, Integer customerId, String timeslot, String date) throws ParseException;
	
	void cancelBooking(Integer bookingId) throws ParseException;
	
}
