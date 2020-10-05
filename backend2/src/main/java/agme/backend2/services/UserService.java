package agme.backend2.services;

import java.util.List;

import agme.backend2.models.User;
import agme.backend2.models.WorkerAvailability;


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
	
	String getService(Integer adminId, String service);
	
	List<String> getAllServices(Integer adminId, String service);
	
	void setService(Integer adminId, String service, String availability);
	
	void deleteAll();
	
	void populateWorkerInformation(String username);
	
}
