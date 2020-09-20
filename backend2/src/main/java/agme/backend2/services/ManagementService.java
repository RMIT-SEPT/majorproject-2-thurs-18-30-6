package agme.backend2.services;

import agme.backend2.models.Management;

public interface ManagementService {
	Management linkWorkerWithAdmin(Integer adminId, Integer workerId);
}