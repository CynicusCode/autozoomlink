import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { JobDetails } from "../types/jobDetails";

const fetchJobDetails = async (jobNumber: string): Promise<JobDetails> => {
	const { data } = await axios.get<JobDetails>(`/api/jobs/${jobNumber}`);
	return data;
};

const useJobDetails = (jobNumber: string, enabled: boolean) => {
	return useQuery<JobDetails, Error>({
		queryKey: ["jobDetails", jobNumber],
		queryFn: () => fetchJobDetails(jobNumber),
		enabled, // Only run the query if enabled is true
	});
};

export default useJobDetails;
