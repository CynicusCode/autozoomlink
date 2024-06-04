export default async function handler(req, res) {
	if (req.method === "GET") {
		const payload = {
			jobNumber: "test-job-001",
			manualTitle: "Test Appointment",
			date: "2024-06-02T19:00:00.000Z",
			durationHrs: 1,
			durationMins: 30,
			endDateTime: "2024-06-02T20:30:00.000Z",
			timeZone: "America/New_York",
			vriApproved: true,
			vriLabel: true,
			vriType: true,
			status: "Scheduled",
			videoLink: "https://zoom.us/j/1234567890",
			requestorName: "Test User",
			requestorEmail: "testuser@example.com",
			createdByLLS: true,
			zoomMeetingId: "1234567890",
			zoomStartLink: "https://zoom.us/s/1234567890",
			zoomJoinLink: "https://zoom.us/j/1234567890",
			zoomInvitation: "123456",
			vriRoomNumber: 1,
		};

		try {
			const response = await fetch(
				"http://localhost:3000/api/supabase/createAppointment",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				},
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`API error: ${errorText}`);
			}

			const responseData = await response.json();
			console.log("API response:", responseData);
			res.status(200).json(responseData);
		} catch (error) {
			console.error("Error calling API:", error);
			res
				.status(500)
				.json({ error: "Error calling API", details: error.message });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
