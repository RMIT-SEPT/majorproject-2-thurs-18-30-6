package agme.backend2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WorkerAvailability {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Integer availabilityId;
	
	private Integer userId;	
    private String name;
    private String status;

    public WorkerAvailability(User user, String name, String status) {
    	this.userId = user.getUserId();
    	this.name = name;
    	this.status = status;
    }
    
    public WorkerAvailability() {
    	
    }

	public void setStatus(String status) {
		this.status = status;
	}

}
