package agme.backend2.repositories;

import org.springframework.stereotype.Repository;

import agme.backend2.models.Timeslot;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface TimeslotRepository extends CrudRepository<Timeslot, Long> {

	Date findDateByTimeslotId(Integer timeslotId);

	@Query("select t from Timeslot t where t.workerId = ?1 and t.timeslot = ?2 and t.longDate = ?3")
	Integer findTimeslotIdByWorkerIdAndTimeslotAndLongDate(Integer workerId, String timeslot, long longDate);
	
}