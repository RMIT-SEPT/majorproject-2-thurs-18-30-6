package agme.backend2.services;

import agme.backend2.models.User;

public interface UserService  {
	User registerUser(String firstName, String lastName, String email, String password, String confirmPassword, String role);
	
	User validateUser(String username, String password);
	
	String getAvailability(String email, String timeslot);
	
	void setAvailability(String email, String timeslot, String availability);
	
	String getService(String email, String service);
	
	void setService(String email, String service, String availability);
	
	void deleteAll();
}
