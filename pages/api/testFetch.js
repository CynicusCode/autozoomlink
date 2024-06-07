// /pages/api/testFetch.js

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const response = await fetch(
				"http://localhost:3000/api/supabase/getAppointments",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			console.log("Response Status:", response.status);
			console.log("Response Status Text:", response.statusText);

			if (!response.ok) {
				const errorDetails = await response.text();
				throw new Error(
					`Error fetching appointments: ${response.statusText} - ${errorDetails}`,
				);
			}

			const data = await response.json();
			console.log("Appointments:", data);
			res.status(200).json(data);
		} catch (error) {
			console.error("Error fetching appointments:", error.message);
			res
				.status(500)
				.json({ error: "Error fetching appointments", details: error.message });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
