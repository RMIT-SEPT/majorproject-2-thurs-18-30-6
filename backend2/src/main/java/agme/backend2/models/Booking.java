package agme.backend2.models;

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
	private Integer timeslotId;
    private String timeslot;
    private String stringDate;
    boolean done = false;
    
    public Booking(Integer workerId, Integer customerId, Integer timeslotId, String timeslot, String stringDate) {
    	this.workerId = workerId;
    	this.customerId = customerId;
    	this.timeslotId = timeslotId;
    	this.timeslot = timeslot;
    	this.stringDate = stringDate;
    }

    public Booking() {
    	
    }

    public Integer getBookingId() {
    	return bookingId;
    }

	public void setBookingId(Integer bookingId) {
		this.bookingId = bookingId;
	}

	public Integer getWorkerId() {
		return workerId;
	}

	public void setWorkerId(Integer workerId) {
		this.workerId = workerId;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public Integer getTimeslotId() {
		return timeslotId;
	}

	public void setTimeslotId(Integer timeslotId) {
		this.timeslotId = timeslotId;
	}

	public String getTimeslot() {
		return timeslot;
	}

	public void setTimeslot(String timeslot) {
		this.timeslot = timeslot;
	}

	public String getStringDate() {
		return stringDate;
	}

	public void setStringDate(String stringDate) {
		this.stringDate = stringDate;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}
}
