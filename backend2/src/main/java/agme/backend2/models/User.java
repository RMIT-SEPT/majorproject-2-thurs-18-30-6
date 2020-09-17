package agme.backend2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
	@Id
	@GeneratedValue
    private Integer userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    
    //this is just a temporary thing
    private String monday = "Unavailable";
    private String tuesday = "Unavailable";
    private String wednesday = "Unavailable";
    private String thursday = "Unavailable";
    private String friday = "Unavailable";
    private String saturday = "Unavailable";
    private String sunday = "Unavailable";

    public User(Integer userId, String firstName, String lastName, String email, String password, String role) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        
    }
    
    public User() {
    	
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
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
		case "Saturday":			
			return saturday;
		case "Sunday":			
			return sunday;
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
		case "Saturday":			
			saturday = status;
			break;
		case "Sunday":			
			sunday = status;
			break;
		default:
			
		}
	}
}
