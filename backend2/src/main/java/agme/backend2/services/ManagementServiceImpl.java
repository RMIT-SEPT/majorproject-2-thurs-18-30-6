package agme.backend2.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import agme.backend2.models.Management;
import agme.backend2.models.User;
import agme.backend2.repositories.ManagementRepository;
import agme.backend2.repositories.UserRepository;

@Service
@Transactional
public class ManagementServiceImpl implements ManagementService{
	@Autowired
	ManagementRepository managementRepository;
	@Autowired
	UserRepository userRepository;
	
	@Override
	public List<User> getAllWorkerFromAdmin(Integer adminId) {
		List<User> workerList = new ArrayList<User>();
		List<Management> managementList = managementRepository.findAllByAdminId(adminId);
		for (Management management : managementList) {
			workerList.add(userRepository.findByUserId(management.getWorkerId()));
		}
		return workerList;
	}

}
