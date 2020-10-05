package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.Booking;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {
	
}
