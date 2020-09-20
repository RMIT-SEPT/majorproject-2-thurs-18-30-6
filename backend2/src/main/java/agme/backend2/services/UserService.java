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
}
