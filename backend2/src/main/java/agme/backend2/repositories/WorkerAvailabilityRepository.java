
package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.WorkerAvailability;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface WorkerAvailabilityRepository extends CrudRepository<WorkerAvailability, Long> {

	@Query("select wa from WorkerAvailability wa where wa.workerId = ?1 and wa.name = ?2")
	WorkerAvailability findByWorkerIdAndName (Integer workerId, String name);
	
	@Query("select wa.status from WorkerAvailability wa where wa.workerId = ?1 and wa.name = ?2")
	String findStatusByWorkerIdAndName (Integer workerId, String name);
}
