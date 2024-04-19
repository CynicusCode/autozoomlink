// This API endpoint fetches appointment details for a specified job number from a mock JSON file.
// It is designed to mirror the Boostlingo API's data structure, enabling seamless transition from development to production.

import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { jobNumber } = req.query;

	try {
		const filePath = path.join(
			process.cwd(),
			"mockdata",
			"api",
			`${jobNumber}.json`,
		);
		const fileData = fs.readFileSync(filePath, "utf8");
		const appointmentDetails = JSON.parse(fileData);

		res.status(200).json(appointmentDetails);
	} catch (error) {
		console.error("Error fetching appointment details:", error);
		res.status(500).json({ error: "Failed to fetch appointment details" });
	}
}
