// pages/api/zoom/createMeeting.js

import fetch from "node-fetch";

export default async function handler(req, res) {
	const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

	// Generate Base64 encoded token
	const token = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString(
		"base64",
	);

	try {
		// Request access token from Zoom using fetch
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

		// Check if the response contains an access token
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
					topic: "New Appointment Meeting",
					type: 2, // Scheduled meeting
					start_time: req.body.start_time, // Start time in ISO format
					duration: req.body.duration, // Duration in minutes
					timezone: req.body.timezone,
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
