package agme.backend2.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Timeslot {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Integer timeslotId;
	private Integer workerId;
	private String timeslot;
	private Date date;
	private long longDate;
	
    public Timeslot(Integer workerId, String timeslot, Date date, long longDate) {
    	this.workerId = workerId;
    	this.timeslot = timeslot;
    	this.date = date;
    	this.longDate = longDate;
    }

    public Timeslot() {
    	
    }

}
