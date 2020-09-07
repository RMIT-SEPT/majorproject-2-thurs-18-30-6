package agme.backend2.services;

import agme.backend2.models.User;

public interface UserService  {
	User registerUser(String firstName, String lastName, String email, String password, String confirmPassword, String role);
	
	User validateUser(String username, String password);
}
