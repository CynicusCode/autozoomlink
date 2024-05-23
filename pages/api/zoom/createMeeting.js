//pages/api/zoom/createMeeting.js
export default async function handler(req, res) {
	const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

	// Generate Base64 encoded token
	const token = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString(
		"base64",
	);

	try {
		// Request access token from Zoom using fetch
		const response = await fetch("https://zoom.us/oauth/token", {
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

		const data = await response.json();

		// Check if the response contains an access token
		if (data?.access_token) {
			res.status(200).json({
				success: true,
				message: "Connected to Zoom successfully!",
				token: data.access_token,
			});
		} else {
			res.status(500).json({
				success: false,
				message: "Failed to get access token from Zoom",
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Error connecting to Zoom",
			error: error.message,
		});
	}
}
