package agme.backend2.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import agme.backend2.models.Management;

@Repository
public interface ManagementRepository extends CrudRepository<Management, Long> {
	
}
