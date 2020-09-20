package agme.backend2.services;


import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.WorkerAvailability;
import agme.backend2.models.User;
import agme.backend2.models.WorkerInformation;
import agme.backend2.models.WorkerService;
import agme.backend2.repositories.WorkerAvailabilityRepository;
import agme.backend2.repositories.UserRepository;
import agme.backend2.repositories.WorkerInformationRepository;
import agme.backend2.repositories.WorkerServiceRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
    UserRepository userRepository;
	@Autowired
    WorkerInformationRepository workerInformationRepository;
	@Autowired
	WorkerAvailabilityRepository workerAvailabilityRepository;
	@Autowired
	WorkerServiceRepository workerServiceRepository;

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
			WorkerInformation worker = new WorkerInformation(newUser);
			workerInformationRepository.save(worker);
			//Populate Worker Information (this should be changed in a later implementation)
			populateWorkerInformation(email);
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
	public String getAvailability(String email, String name) {
		WorkerInformation worker = workerInformationRepository.findByEmail(email);
		String availability = workerAvailabilityRepository.findStatusByWorkerIdAndName(worker.getId(), name);
		return availability;				
	}
	
	@Override
	public void setAvailability(String email, String name, String availability) {
		WorkerInformation worker = workerInformationRepository.findByEmail(email);
		Integer workerId = worker.getId();
		WorkerAvailability timeslot = workerAvailabilityRepository.findByWorkerIdAndName(workerId, name);
		if (timeslot == null) {
			timeslot = new WorkerAvailability(worker, name, availability);
		} else {
			timeslot.setStatus(availability);
		}
		workerAvailabilityRepository.save(timeslot);		
	}
	
	@Override
	public String getService(String email, String name) {
		Integer worker = workerInformationRepository.findWorkerIdByEmail(email);
		String workerService = workerServiceRepository.findStatusByWorkerIdAndName(worker, name);
		return workerService;			
	}
	
	@Override
	public void setService(String email, String name, String availability) {
		WorkerInformation worker = workerInformationRepository.findByEmail(email);
		Integer workerId = worker.getId();
		WorkerService workerService = workerServiceRepository.findByWorkerIdAndName(workerId, name);
		if (workerService == null) {
			workerService = new WorkerService(worker, name, availability);
		} else {
			workerService.setStatus(availability);
		}
		workerServiceRepository.save(workerService);		
	}
		
	@Override
	public void deleteAll() {
		userRepository.deleteAll();
		workerInformationRepository.deleteAll();
		workerAvailabilityRepository.deleteAll();
		workerServiceRepository.deleteAll();
	}
	
	@Override
	public void populateWorkerInformation(String email) {
		setAvailability(email, "Monday", "Unavailable");
		setAvailability(email, "Tuesday", "Unavailable");
		setAvailability(email, "Wednesday", "Unavailable");
		setAvailability(email, "Thursday", "Unavailable");
		setAvailability(email, "Friday", "Unavailable");
		setService(email, "Eating", "Unavailable");
		setService(email, "Drinking", "Unavailable");
	}
	
}
