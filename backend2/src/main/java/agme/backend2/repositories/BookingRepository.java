package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.Booking;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Long> {
	
	void deleteByBookingId(Integer bookingId);
	
	@Query("select b from Booking b where b.workerId = ?1 and b.date >= ?2")
	List<Booking> findByWorkerIdAfterDate(Integer workerId, Date date);
	
	@Query("select b from Booking b where b.customerId = ?1 and b.date >= ?2")
	List<Booking> findByCustomerIdAfterDate(Integer customerId, Date date);
	
}
