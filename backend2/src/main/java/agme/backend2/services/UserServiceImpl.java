package agme.backend2.services;


import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.WorkerAvailability;
import agme.backend2.models.AdminCompany;
import agme.backend2.models.Booking;
import agme.backend2.models.Management;
import agme.backend2.models.User;
import agme.backend2.models.AdminCompany;
import agme.backend2.models.Management;
import agme.backend2.models.WorkerService;
import agme.backend2.repositories.WorkerAvailabilityRepository;
import agme.backend2.repositories.AdminCompanyRepository;
import agme.backend2.repositories.BookingRepository;
import agme.backend2.repositories.ManagementRepository;
import agme.backend2.repositories.UserRepository;
import agme.backend2.repositories.WorkerServiceRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
    UserRepository userRepository;
	@Autowired
	WorkerAvailabilityRepository workerAvailabilityRepository;
	@Autowired
	WorkerServiceRepository workerServiceRepository;	
	@Autowired
	AdminCompanyRepository adminCompanyRepository;
	@Autowired
	ManagementRepository managementRepository;	
	@Autowired
	BookingRepository bookingRepository;

	@Override
	//register customer into the database
	public User registerCustomer(String firstName, String lastName, String username, String password, String confirmPassword,
			String address, String phone, String role) throws ValidationException {
		//check if password matches confirm password
		if(!password.equals(confirmPassword)) {
			throw new ValidationException("Password and confirm password do not match");
		}
		Integer usernameCount = userRepository.countByUsername(username);
		//validation checks to see if username already existed to keep it unique
		if (usernameCount > 0){
			throw new ValidationException("Username already existed");
		}
		User newUser = new User();
		newUser.setFirstName(firstName);
		newUser.setLastName(lastName);
		newUser.setUsername(username);
		newUser.setPassword(password);
		newUser.setAddress(address);
		newUser.setPhone(phone);
		newUser.setRole(role);
		return userRepository.save(newUser);
	}
	
	@Override
	//registering admin into database
	public User registerAdmin(String firstName, String lastName, String username, String password,
			String confirmPassword, String company, String address, String phone, String role)  {
		User newUser = registerCustomer(firstName,lastName,username,password,confirmPassword,address,phone,role);
		AdminCompany newCompany = new AdminCompany();
		newCompany.setAdminId(newUser.getUserId());
		newCompany.setCompany(company);
		adminCompanyRepository.save(newCompany);
		return newUser;
	}
	
	@Override
	//registering worker into database
	public User registerWorker(String firstName, String lastName, String username, String password,
			String confirmPassword, String address, String phone, String role, Integer adminId) throws ValidationException {
		Integer idCount = userRepository.countByUserId(adminId);		
		if (idCount <= 0){
			throw new ValidationException("Admin does not exist");
		}
		User newUser = registerCustomer(firstName,lastName,username,password,confirmPassword,address,phone,role);
		Management newManagement = new Management();
		newManagement.setAdminId(adminId);
		newManagement.setWorkerId(newUser.getUserId());
		managementRepository.save(newManagement);
		return newUser;
	}
	//find availability of worker with that specific username
	public String getAvailability(String username, String name) {
		Integer userId = userRepository.findUserIdByUsername(username);
		if (userId == null) {
			throw new ValidationException("User does not exist");			
		}
		String availability = workerAvailabilityRepository.findStatusByUserIdAndName(userId, name);
		if (availability == null) {
			throw new ValidationException("Timeslot does not exist");			
		}
		return availability;				
	}
	
	@Override
	//set availability for the specific user (worker)
	public void setAvailability(String username, String name, String availability) {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new ValidationException("User does not exist");			
		}
		Integer userId = user.getUserId();
		WorkerAvailability timeslot = workerAvailabilityRepository.findByUserIdAndName(userId, name);
		if (timeslot == null) {
			timeslot = new WorkerAvailability(user, name, availability);
		} else {
			timeslot.setStatus(availability);
		}
		workerAvailabilityRepository.save(timeslot);		
	}
	
	@Override
	//load shifts for the specific worker
	public List<String> getAssigned(Integer userId) {
		List<String> shifts = workerAvailabilityRepository.findTimeslotByUserIdAndAssigned(userId, true);
		return shifts;				
	}
	
	@Override
	//set a shift for the specific worker in the database
	public void setAssigned(Integer userId, String timeslot, Boolean assigned) {
		WorkerAvailability shift = workerAvailabilityRepository.findByUserIdAndName(userId, timeslot);
		if (shift == null) {
			throw new ValidationException("Timeslot does not exist");
		}
		//set it to the boolean value passed from font end
		shift.setAssigned(assigned);
		workerAvailabilityRepository.save(shift);		
	}
	
	@Override
	//set services provided by admin into database
	public String getService(Integer userId, String name) {
		String workerService = workerServiceRepository.findStatusByUserIdAndName(userId, name);
		if (workerService == null) {
			throw new ValidationException("Service does not exist");			
		}
		return workerService;			
	}
	
	@Override
	//set services provided by admin into database
	public List<String> getAllServices(Integer userId) {
		List<String> workerService = workerServiceRepository.findServiceByUserId(userId);
		return workerService;			
	}
	
	@Override
	//get services provided by admin from database
	public void setService(Integer userId, String name, String availability, String description) {
		WorkerService workerService = workerServiceRepository.findByUserIdAndName(userId, name);
		if (workerService == null) {
			workerService = new WorkerService(userId, name, availability, description);
		} else {
			workerService.setStatus(availability);
			workerService.setDescription(description);
		}
		workerServiceRepository.save(workerService);		
	}
		
	@Override
	public void deleteAll() {
		userRepository.deleteAll();
		workerAvailabilityRepository.deleteAll();
		workerServiceRepository.deleteAll();
		bookingRepository.deleteAll();
	}

	@Override
	public User validateUser(String username, String password) throws ValidationException {
		User newUser = userRepository.findByUsernameAndPassword(username, password);
		if (newUser == null) {
			throw new ValidationException("Wrong username or password");
		}
		return newUser;
	}

	@Override
	//get admin id from company name
	public Integer getAdminId(String company) {
		Integer adminId = adminCompanyRepository.findAdminIdByCompany(company);
		if (adminId == null) {
			throw new ValidationException("Company does not exist");
		}
		return adminId;
	}
	
	@Override
	//get all company names
	public List<String> getAllCompanies(){
		List<String> companies = adminCompanyRepository.findAllCompany();
		return companies;
	}
	
	@Override
	//get all current bookings for a worker or customer
	public List<Booking> getBookings(Integer userId){
		List<Booking> bookings = null;
		String role = userRepository.findRoleByUserId(userId);
		if (role == "Worker") {
			bookings = bookingRepository.findByWorkerIdAfterDate(userId, new Date());
		} else if (role == "Customer") {
			bookings = bookingRepository.findByCustomerIdAfterDate(userId, new Date());
		}
		return bookings;
	}
	
	@Override
	//create a booking
	public Booking createBooking(Integer workerId, Integer customerId, String timeslot, Date date){
		Booking booking = new Booking(workerId, customerId, timeslot, date);
		return bookingRepository.save(booking);
	}
	
	@Override
	//delete a booking
	public void cancelBooking(Integer bookingId){
		bookingRepository.deleteByBookingId(bookingId);
	}
	
}
