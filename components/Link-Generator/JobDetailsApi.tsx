// JobDetailsApi.tsx
export const fetchJobDetails = async (jobNumber: string) => {
	try {
		const response = await fetch(`http://localhost:3000/api/jobs/${jobNumber}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch details:", error);
		throw error;
	}
};
