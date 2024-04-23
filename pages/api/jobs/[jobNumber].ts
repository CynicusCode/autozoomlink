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

		// Extract the ID from the appointment details
		const {
			id, // make sure this is part of your JSON structure
			defaultLanguage,
			actualLocation,
			bookingMode,
			expectedDurationHrs,
			expectedDurationMins,
			expectedEndDate,
			expectedStartDate,
			expectedStartTime,
			timeZone,
			timeZoneDisplayName,
			requestor,
			status,
			refs,
		} = appointmentDetails;

		const videoLinkField =
			refs?.find((ref: any) => ref.name?.toLowerCase().includes("video link"))
				?.referenceValue || "No video link available";

		const isVirtual = actualLocation?.addrEntered?.includes("VR");

		const filteredJobDetails = {
			jobNumber: id.toString(), // Convert to string if necessary
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
			timeZone: timeZone.toString(),
			timeZoneDisplayName: timeZoneDisplayName.toString(),
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
