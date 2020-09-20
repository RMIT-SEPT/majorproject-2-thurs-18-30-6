package agme.backend2.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
public class Worker {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Integer workerId;
	
	private String email;
	
    private String monday = "Unavailable";
    private String tuesday = "Unavailable";
    private String wednesday = "Unavailable";
    private String thursday = "Unavailable";
    private String friday = "Unavailable";
    
    private String eating = "Unavailable";
    private String drinking = "Unavailable";

    public Worker(User user) {
    	this.email = user.getEmail();
    }
    
    public Worker() {
    	
    }
    
	//TODO
	public String getAvailability(String timeslot) {
		switch(timeslot) {
		case "Monday":			
			return monday;
		case "Tuesday":			
			return tuesday;
		case "Wednesday":			
			return wednesday;
		case "Thursday":			
			return thursday;
		case "Friday":			
			return friday;
		default:
			return null;
		}
	}
	
	public void setAvailability(String timeslot, String status) {
		switch(timeslot) {
		case "Monday":			
			monday = status;
			break;
		case "Tuesday":			
			tuesday = status;
			break;
		case "Wednesday":			
			wednesday = status;
			break;
		case "Thursday":			
			thursday = status;
			break;
		case "Friday":			
			friday = status;
			break;
		default:
			
		}
	}
	
	public String getService(String service) {
		switch(service) {
		case "Eating":			
			return eating;
		case "Drinking":			
			return drinking;
		default:
			return null;
		}
	}
	
	public void setService(String service, String status) {
		switch(service) {
		case "Eating":			
			eating = status;
			break;
		case "Drinking":			
			drinking = status;
			break;
		default:
			
		}
	}
}
