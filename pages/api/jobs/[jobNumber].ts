// This API endpoint fetches appointment details for a specified job number from a mock JSON file.
// It is designed to mirror the Boostlingo API's data structure, enabling seamless transition from development to production.
// Since this API call may contain HIPAA PHI (Protected Health Information), I have decided to filter the data directly
// in the endpoint for security reasons. This ensures that sensitive information is not unnecessarily exposed to the client-side.

import { promises as fs } from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { jobNumber } = req.query;

	// Validate jobNumber
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
		// Read the file asynchronously with error handling
		const fileData = await fs.readFile(filePath, "utf8");
		const appointmentDetails = JSON.parse(fileData);

		// Filter and transform the appointment details data directly in the endpoint
		const {
			jobNumber,
			defaultLanguage,
			actualLocation,
			bookingMode,
			expectedDurationHrs,
			expectedDurationMins,
			expectedEndDate,
			expectedStartDate,
			expectedStartTime,
			requestor,
			status,
			refs,
		} = appointmentDetails;

		const videoLinkField =
			refs?.find((ref: any) => ref.name?.toLowerCase().includes("video link"))
				?.referenceValue || "No video link available";

		const isVirtual = actualLocation?.addrEntered?.includes("VR");

		const filteredJobDetails = {
			jobNumber,
			language: defaultLanguage?.displayName || "Default Language",
			location: actualLocation?.addrEntered || "Default Location",
			appType: bookingMode?.name || "Default Booking Mode",
			locationLabel: actualLocation?.displayLabel || "Default Location Label",
			isLocationLabel: !!isVirtual,
			expectedDurationHrs,
			expectedDurationMins,
			expectedEndDate,
			expectedStartDate,
			expectedStartTime,
			notificationEmail: requestor?.email || "noemail@example.com",
			requestorName: requestor?.name || "Unknown Requestor",
			jobStatus: status?.name || "Status Unknown",
			videoLinkField,
		};

		res.status(200).json(filteredJobDetails);
	} catch (error) {
		console.error("Error fetching appointment details:", error);
		if (error.code === "ENOENT") {
			return res.status(404).json({ error: "Appointment details not found" });
		}
		res.status(500).json({ error: "Failed to fetch appointment details" });
	}
}
