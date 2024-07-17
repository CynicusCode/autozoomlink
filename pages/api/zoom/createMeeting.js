// pages/api/zoom/createMeeting.js

export default async function handler(req, res) {
	console.log("Request received to create Zoom meeting:", req.body);

	const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

	if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
		console.error("Zoom API credentials are not set in environment variables");
		return res.status(500).json({
			success: false,
			message: "Zoom API credentials are not set in environment variables",
		});
	}

	const token = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString(
		"base64",
	);

	try {
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
			console.error("Failed to get access token from Zoom");
			return res.status(500).json({
				success: false,
				message: "Failed to get access token from Zoom",
			});
		}

		const accessToken = tokenData.access_token;

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
					start_time: req.body.start_time,
					duration: req.body.duration,
					timezone: req.body.timezone,
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
			console.error("Error creating Zoom meeting:", meetingData.message);
			return res.status(meetingResponse.status).json({
				success: false,
				message: meetingData.message,
			});
		}

		console.log("Zoom meeting created successfully:", meetingData);
		res.status(201).json({
			success: true,
			meeting: meetingData,
		});
	} catch (error) {
		console.error("Error creating Zoom meeting:", error);
		res.status(500).json({
			success: false,
			message: "Error creating Zoom meeting",
			error: error.message,
		});
	}
}
