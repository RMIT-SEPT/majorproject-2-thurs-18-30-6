
package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.WorkerService;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface WorkerServiceRepository extends CrudRepository<WorkerService, Long> {

	@Query("select ws from WorkerService ws where ws.workerId = ?1 and ws.name = ?2")
	WorkerService findByWorkerIdAndName (Integer workerId, String name);
	
	@Query("select ws.status from WorkerService ws where ws.workerId = ?1 and ws.name = ?2")
	String findStatusByWorkerIdAndName (Integer workerId, String name);
}
