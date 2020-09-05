package agme.backend2.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import agme.backend2.models.User;
import agme.backend2.repositories.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
    UserRepository userRepository;

	@Override
	public User registerUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public User validateUser(String email, String password) {
		User user = userRepository.findByEmailAndPassword(email, password);
		return user;
	}

	
	
	
	
}
