async function testCreateMeeting() {
	const apiUrl = "http://localhost:3000/api/zoom/createMeeting"; // Update this URL to match your local server URL

	const meetingDetails = {
		topic: "Test Meeting",
		start_time: "2024-06-01T10:00:00Z", // Adjust the date and time as needed
		duration: 30, // Duration in minutes
		timezone: "UTC",
	};

	try {
		console.log(`Sending request to ${apiUrl} with details:`, meetingDetails);

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(meetingDetails),
		});

		const contentType = response.headers.get("content-type");
		let data;

		if (contentType && contentType.indexOf("application/json") !== -1) {
			data = await response.json();
		} else {
			data = await response.text();
		}

		console.log("Response status:", response.status);
		console.log("Response content type:", contentType);

		if (response.ok) {
			console.log("Connection successful. Meeting created:", data);
		} else {
			console.error("Failed to create meeting:", data);
		}
	} catch (error) {
		console.error("Error connecting to the API:", error);
	}
}

testCreateMeeting();
