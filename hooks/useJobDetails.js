// hooks/useJobDetails.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchJobDetails = async (jobNumber) => {
	const { data } = await axios.get(`/api/jobs/${jobNumber}`);
	return data;
};

const useJobDetails = (jobNumber) => {
	return useQuery(["jobDetails", jobNumber], () => fetchJobDetails(jobNumber), {
		enabled: !!jobNumber, // Only run the query if jobNumber is provided
	});
};

export default useJobDetails;
