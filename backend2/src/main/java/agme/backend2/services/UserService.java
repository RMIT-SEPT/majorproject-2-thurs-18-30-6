package agme.backend2.services;

import agme.backend2.models.User;

public interface UserService  {
	User registerUser(User user);
	
	User validateUser(String username, String password);
}
