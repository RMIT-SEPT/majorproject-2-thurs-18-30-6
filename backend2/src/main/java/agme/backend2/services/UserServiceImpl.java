package agme.backend2.services;


import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.User;
import agme.backend2.repositories.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
    UserRepository userRepository;

	@Override
	public User registerUser(String firstName, String lastName, String email, String password, String confirmPassword, String role) throws ValidationException {
		if(!password.equals(confirmPassword)) {
			throw new ValidationException("Password and confirm password do not match");
		}
		Integer emailCount = userRepository.countByEmail(email);		
		if (emailCount > 0){
			throw new ValidationException("Email already existed");
		}
		Integer userID = ID_GENERATOR.getAndIncrement();
		User newUser = new User(userID,firstName,lastName,email,password,role);
		return userRepository.save(newUser);
	}

	@Override
	public User validateUser(String email, String password) {
		User user = userRepository.findByEmailAndPassword(email, password);
		return user;
	}
	private static AtomicInteger ID_GENERATOR = new AtomicInteger();
	
	public String getAvailability(String email, String timeslot) {
		User user = userRepository.findByEmail(email);
		String availability = user.getAvailability(timeslot);
		return availability;		
	}
	
	public void setAvailability(String email, String timeslot, String availability) {
		User user = userRepository.findByEmail(email);
		user.setAvailability(timeslot, availability);
		userRepository.save(user);		
	}
	
	public String getService(String email, String service) {
		User user = userRepository.findByEmail(email);
		String availability = user.getService(service);
		return availability;		
	}
	
	public void setService(String email, String service, String availability) {
		User user = userRepository.findByEmail(email);
		user.setService(service, availability);
		userRepository.save(user);		
	}
	
	@Override
	public void deleteAll() {
		userRepository.deleteAll();
	}
	
	
}
