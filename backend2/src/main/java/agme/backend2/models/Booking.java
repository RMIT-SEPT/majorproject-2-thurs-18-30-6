package agme.backend2.models;

import java.text.SimpleDateFormat;
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
	private Integer timeslotId;
    private String timeslot;
    private Date date;
    private String stringDate;

	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    
    public Booking(Integer workerId, Integer customerId, Integer timeslotId, String timeslot, Date date) {
    	this.workerId = workerId;
    	this.customerId = customerId;
    	this.timeslotId = timeslotId;
    	this.timeslot = timeslot;
    	this.date = date;
    	this.stringDate = formatter.format(date);
    }

    public Booking() {
    	
    }
	
}
