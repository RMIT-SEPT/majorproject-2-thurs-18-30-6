package agme.backend2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WorkerInformation {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Integer workerId;
	
	private String email;
	
    public WorkerInformation(User user) {
    	this.email = user.getEmail();
    }
    
    public WorkerInformation() {
    	
    }
    
    public Integer getId() {
    	return this.workerId;
    }
    
}
