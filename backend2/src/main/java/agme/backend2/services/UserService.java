package agme.backend2.services;

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
	
	String getService(String username, String service);
	
	void setService(String username, String service, String availability);
	
	void deleteAll();
	
	void populateWorkerInformation(String username);
	
}
