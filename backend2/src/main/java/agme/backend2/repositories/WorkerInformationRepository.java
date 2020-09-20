
package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.WorkerInformation;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface WorkerInformationRepository extends CrudRepository<WorkerInformation, Long> {

	@Query("select w from WorkerInformation w where w.email = ?1")
	WorkerInformation findByEmail (String email);
	
	@Query("select w.workerId from WorkerInformation w where w.email = ?1")
	Integer findWorkerIdByEmail (String email);
}
