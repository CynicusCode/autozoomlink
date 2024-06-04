// app/hooks/useJobDetails.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { JobDetails } from "../types/jobDetails";

const fetchJobDetails = async (jobNumber: string): Promise<JobDetails> => {
	const { data } = await axios.get(`/api/jobs/${jobNumber}`);
	return data;
};

const useJobDetails = (jobNumber: string) => {
	return useQuery<JobDetails, Error>({
		queryKey: ["jobDetails", jobNumber],
		queryFn: () => fetchJobDetails(jobNumber),
		enabled: !!jobNumber, // Only run the query if jobNumber is provided
	});
};

export default useJobDetails;
