// pages/api/zoom/createMeeting.js

// Export the default handler function for the API route
export default async function handler(req, res) {
	// Extract Zoom API credentials from environment variables
	const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

	// Check if the necessary environment variables are set
	if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
		return res.status(500).json({
			success: false,
			message: "Zoom API credentials are not set in environment variables",
		});
	}

	// Encode the client ID and client secret in base64 format for the Basic Auth header
	const token = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString(
		"base64",
	);

	try {
		// Request an access token from Zoom
		const tokenResponse = await fetch("https://zoom.us/oauth/token", {
			method: "POST",
			headers: {
				Authorization: `Basic ${token}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "account_credentials",
				account_id: ZOOM_ACCOUNT_ID,
			}),
		});

		// Parse the response to get the token data
		const tokenData = await tokenResponse.json();

		// Check if the access token was successfully obtained
		if (!tokenData?.access_token) {
			return res.status(500).json({
				success: false,
				message: "Failed to get access token from Zoom",
			});
		}

		const accessToken = tokenData.access_token;

		// Create a new Zoom meeting using the access token
		const meetingResponse = await fetch(
			"https://api.zoom.us/v2/users/me/meetings",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					topic: req.body.topic,
					type: 2, // Scheduled meeting
					start_time: req.body.start_time, // Local time of the meeting
					duration: req.body.duration, // Duration in minutes
					timezone: req.body.timezone, // Time zone of the meeting
					settings: {
						join_before_host: true, // Allow participants to join before the host
						participant_video: true, // Enable participant video
						host_video: true, // Enable host video
					},
				}),
			},
		);

		// Parse the response to get the meeting data
		const meetingData = await meetingResponse.json();

		// Check if the meeting was successfully created
		if (meetingResponse.status !== 201) {
			return res.status(meetingResponse.status).json({
				success: false,
				message: meetingData.message,
			});
		}

		// Send a success response with the meeting data
		res.status(201).json({
			success: true,
			meeting: meetingData,
		});
	} catch (error) {
		// Log the error and send a failure response
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Error creating Zoom meeting",
			error: error.message,
		});
	}
}
