
package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.Worker;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface WorkerRepository extends CrudRepository<Worker, Long> {

	@Query("select w from Worker w where w.email = ?1")
	Worker findByEmail (String email);
}
