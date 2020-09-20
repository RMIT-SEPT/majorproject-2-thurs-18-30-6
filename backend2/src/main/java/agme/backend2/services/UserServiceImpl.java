package agme.backend2.services;


import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.User;
import agme.backend2.models.Worker;
import agme.backend2.repositories.UserRepository;
import agme.backend2.repositories.WorkerRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
    UserRepository userRepository;
	@Autowired
    WorkerRepository workerRepository;

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
		
		if (role == "Worker") {
			Worker worker = new Worker(newUser);
			workerRepository.save(worker);
		}

		return userRepository.save(newUser);
	}

	@Override
	public User validateUser(String email, String password) {
		User user = userRepository.findByEmailAndPassword(email, password);
		return user;
	}
	private static AtomicInteger ID_GENERATOR = new AtomicInteger();
	
	@Override
	public String getAvailability(String email, String timeslot) {
		Worker worker = workerRepository.findByEmail(email);
		String availability = worker.getAvailability(timeslot);
		return availability;		
	}
	
	@Override
	public void setAvailability(String email, String timeslot, String availability) {
		Worker worker = workerRepository.findByEmail(email);
		worker.setAvailability(timeslot, availability);
		workerRepository.save(worker);		
	}
	
	@Override
	public String getService(String email, String service) {
		Worker worker = workerRepository.findByEmail(email);
		String availability = worker.getService(service);
		return availability;		
	}
	
	@Override
	public void setService(String email, String service, String availability) {
		Worker worker = workerRepository.findByEmail(email);
		worker.setService(service, availability);
		workerRepository.save(worker);		
	}
	
	@Override
	public void deleteAll() {
		userRepository.deleteAll();
		workerRepository.deleteAll();
	}
	
	
}
