// src/lib/fetchAppointments.js
const fetchAppointments = async () => {
	const response = await fetch("/api/supabase/getAppointments");
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

export default fetchAppointments;
