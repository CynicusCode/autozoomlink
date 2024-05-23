import { promises as fs } from "node:fs";
import path, { join } from "node:path";
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

	const dirPath = path.join(process.cwd(), "mockdata", "api");

	try {
		// List all files in the directory
		const files = await fs.readdir(dirPath);
		// Filter files based on jobNumber
		const matchedFile = files.find((file) => file === `${jobNumber}.json`);

		if (!matchedFile) {
			return res.status(404).json({ error: "Appointment details not found" });
		}

		const filePath = path.join(dirPath, matchedFile);
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
			expectedStartDate,
			expectedStartTime,
			timeZone,
			timeZoneDisplayName,
			requestor,
			status,
			refs,
		} = appointmentDetails;

		const videoLinkField =
			refs?.find((ref: { name?: string }) =>
				ref.name?.toLowerCase().includes("video link"),
			)?.referenceValue || "No 3rd party video link field was found";

		const isVirtual = actualLocation?.addrEntered?.includes("VR");

		const filteredJobDetails = {
			jobNumber: id.toString(), // Convert to string if necessary
			language: defaultLanguage?.displayName || "Default Language",
			appType: bookingMode?.name || "Default Booking Mode",
			locationLabel: actualLocation?.displayLabel || "Default Location Label",
			isVirtualLabelInAdress: !!isVirtual,
			expectedDurationHrs,
			expectedDurationMins,
			expectedStartDate,
			expectedStartTime,
			timeZone: timeZone.toString(),
			timeZoneDisplayName: timeZoneDisplayName.toString(),
			requestorEmail: requestor?.email || "noemail@example.com",
			requestorName: requestor?.name || "Unknown Requestor",
			jobStatus: status?.name || "Status Unknown",
			videoLinkField,
		};

		res.status(200).json(filteredJobDetails);
	} catch (error: unknown) {
		console.error("Error fetching appointment details:", error);
		if ((error as NodeJS.ErrnoException).code === "ENOENT") {
			return res.status(404).json({ error: "Appointment details not found" });
		}
		res.status(500).json({ error: "Failed to fetch appointment details" });
	}
}
