//lib/fetchAppointments.js
const fetchAppointments = async () => {
	const response = await fetch("/api/supabase/getAppointments");

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await response.json();
	return data;
};

export default fetchAppointments;
