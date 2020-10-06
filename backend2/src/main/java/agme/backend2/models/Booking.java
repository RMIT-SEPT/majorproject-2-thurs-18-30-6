package agme.backend2.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Integer bookingId;
	
	private Integer workerId;	
	private Integer customerId;
    private String timeslot;
    private Date date;
    
    public Booking(Integer workerId, Integer customerId, String timeslot, Date date) {
    	this.workerId = workerId;
    	this.customerId = customerId;
    	this.timeslot = timeslot;
    	this.date = date;
    }

    public Booking() {
    	
    }
	
}