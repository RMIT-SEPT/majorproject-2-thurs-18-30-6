package agme.backend2.models;

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
	private String stringDate;
	private boolean booked = false;
	
    public Timeslot(Integer workerId, String timeslot, String stringDate) {
    	this.workerId = workerId;
    	this.timeslot = timeslot;
    	this.stringDate = stringDate;
    }

    public Timeslot() {
    	
    }
    
    public void setBooked(boolean booked) {
    	this.booked = booked;
    }

}
