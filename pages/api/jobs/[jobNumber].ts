// This API endpoint fetches appointment details for a specified job number from a mock JSON file.
// It is designed to mirror the Boostlingo API's data structure, enabling seamless transition from development to production.
// the information is sent to app/hooks/useAppointmentDetails.tsx before sending it to the LinkGenerator.tsx component, to use SSR and avoid sending the data to the client.

import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { jobNumber } = req.query;

	// Validate jobNumber to ensure it's a safe, expected format (e.g., numeric)
	if (!/^\d+$/.test(jobNumber as string)) {
		return res.status(400).json({ error: "Invalid job number format" });
	}

	const filePath = path.join(
		process.cwd(),
		"mockdata",
		"api",
		`${jobNumber}.json`,
	);

	try {
		// Implemented fs.promises.readFile to read the file asynchronously with better error handling
		const fileData = await fs.promises.readFile(filePath, "utf8");
		const appointmentDetails = JSON.parse(fileData);
		res.status(200).json(appointmentDetails);
	} catch (error) {
		console.error("Error fetching appointment details:", error);
		if (error.code === "ENOENT") {
			return res.status(404).json({ error: "Appointment details not found" });
		}
		res.status(500).json({ error: "Failed to fetch appointment details" });
	}
}
