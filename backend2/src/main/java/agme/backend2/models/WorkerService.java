package agme.backend2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WorkerService {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Integer serviceId;
	
	private Integer userId;	
    private String name;
    private String status;

    public WorkerService(User user, String name, String status) {
    	this.userId = user.getUserId();
    	this.name = name;
    	this.status = status;
    }
    
    public WorkerService() {
    	
    }

	public void setStatus(String status) {
		this.status = status;
	}
}
