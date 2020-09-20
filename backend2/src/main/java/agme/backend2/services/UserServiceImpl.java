package agme.backend2.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import agme.backend2.exceptions.ValidationException;
import agme.backend2.models.User;
import agme.backend2.models.AdminCompany;
import agme.backend2.repositories.AdminCompanyRepository;
import agme.backend2.repositories.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
    UserRepository userRepository;
	@Autowired
	AdminCompanyRepository adminCompanyRepository;

	@Override
	public User registerCustomer(String firstName, String lastName, String username, String password, String confirmPassword,
			String address, String phone, String role) throws ValidationException {
		if(!password.equals(confirmPassword)) {
			throw new ValidationException("Password and confirm password do not match");
		}
		Integer usernameCount = userRepository.countByUsername(username);		
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
	public User registerAdmin(String firstName, String lastName, String username, String password,
			String confirmPassword, String company, String address, String phone, String role) throws ValidationException {
		User newUser = registerCustomer(firstName,lastName,username,password,confirmPassword,address,phone,role);
		AdminCompany newCompany = new AdminCompany();
		newCompany.setAdminId(newUser.getUserId());
		newCompany.setCompany(company);
		adminCompanyRepository.save(newCompany);
		return newUser;
	}
	
	@Override
	public User registerWorker(String firstName, String lastName, String username, String password,
			String confirmPassword, String address, String phone, String role, String adminId) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public User validateUser(String username, String password) {
		User user = userRepository.findByUsernameAndPassword(username, password);
		return user;
	}
	
	@Override
	public void deleteAll() {
		userRepository.deleteAll();
	}

}
