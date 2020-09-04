
package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.User;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	@Query("select u from User u where u.email = ?1 and u.password = ?2")
	User findByEmailAndPassword (String email, String password);
}
