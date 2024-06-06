// pages/api/zoom/createMeeting.js
export default async function handler(req, res) {
	const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

	if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
		return res.status(500).json({
			success: false,
			message: "Zoom API credentials are not set in environment variables",
		});
	}

	const token = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString(
		"base64",
	);

	try {
		// Request access token from Zoom
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

		const tokenData = await tokenResponse.json();

		if (!tokenData?.access_token) {
			return res.status(500).json({
				success: false,
				message: "Failed to get access token from Zoom",
			});
		}

		const accessToken = tokenData.access_token;

		// Create Zoom meeting
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
					type: 2,
					start_time: req.body.start_time, // Local time
					duration: req.body.duration,
					timezone: req.body.timezone, // Time zone
					settings: {
						join_before_host: true,
						participant_video: true,
						host_video: true,
					},
				}),
			},
		);

		const meetingData = await meetingResponse.json();

		if (meetingResponse.status !== 201) {
			return res.status(meetingResponse.status).json({
				success: false,
				message: meetingData.message,
			});
		}

		res.status(201).json({
			success: true,
			meeting: meetingData,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Error creating Zoom meeting",
			error: error.message,
		});
	}
}
