
package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.User;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	@Query("select u from User u where u.username = ?1 and u.password = ?2")
	User findByUsernameAndPassword (String username, String password);
	Integer countByUsername(String username);
	Integer countByUserId(Integer userId);
	User findByUserId(Integer userId);
}
