import { promises as fs } from "node:fs";
import path from "node:path";
import type { NextApiRequest, NextApiResponse } from "next";
//app/pages/api/jobs/[jobsNumber].ts This file will be used to fetch the appointment details based on the job number provided in the URL. The job details will be filtered and returned in a simplified format.

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { jobNumber } = req.query;

	console.log(`Received request for jobNumber: ${jobNumber}`);

	// Validate jobNumber
	if (!/^\d+$/.test(jobNumber as string)) {
		console.log("Invalid job number format");
		return res.status(400).json({ error: "Invalid job number format" });
	}

	// Update the directory path to include 'app'
	const dirPath = path.join(process.cwd(), "app", "mockdata", "api");
	console.log(`Directory path: ${dirPath}`);

	try {
		// List all files in the directory
		const files = await fs.readdir(dirPath);
		console.log(`Files in directory: ${files.join(", ")}`);

		// Filter files based on jobNumber
		const matchedFile = files.find((file) => file === `${jobNumber}.json`);
		console.log(`Matched file: ${matchedFile}`);

		if (!matchedFile) {
			console.log("Appointment details not found");
			return res.status(404).json({ error: "Appointment details not found" });
		}

		const filePath = path.join(dirPath, matchedFile);
		console.log(`File path: ${filePath}`);
		const fileData = await fs.readFile(filePath, "utf8");
		const appointmentDetails = JSON.parse(fileData);
		console.log(`Appointment details: ${JSON.stringify(appointmentDetails)}`);

		// Extract the necessary fields from the appointment details
		const {
			id,
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
			notificationEmail,
			status,
			refs,
			criteria,
		} = appointmentDetails;

		// Find video link field if available
		const videoLinkField =
			refs?.find((ref: { name?: string }) =>
				ref.name?.toLowerCase().includes("video link"),
			)?.referenceValue || "No 3rd party video link field was found";

		// Check if the location or booking mode indicate a virtual session
		const isVirtual = actualLocation?.displayLabel
			?.toLowerCase()
			.includes("vr");
		const isVriType = bookingMode?.description?.toLowerCase().includes("video");

		// Check for VRI Approved criteria
		const isVriApproved = appointmentDetails.requirements?.some(
			(req: { criteria?: { name: string } }) =>
				req.criteria?.name === "VRI Approved",
		);

		// Prepare the filtered job details
		const filteredJobDetails = {
			jobNumber: id.toString(),
			language: defaultLanguage?.displayName || "Default Language",
			isVriType: !!isVriType,
			isVirtualLabelInAddress: !!isVirtual,
			isVriApproved,
			expectedDurationHrs,
			expectedDurationMins,
			expectedStartDate,
			expectedStartTime,
			timeZone: timeZone.toString(),
			timeZoneDisplayName: timeZoneDisplayName.toString(),
			requestorEmail: notificationEmail || "noemail@example.com",
			requestorName: requestor?.name || "Unknown Requestor",
			jobStatus: status?.name || "Status Unknown",
			videoLinkField,
		};

		console.log("Filtered job details:", filteredJobDetails);

		res.status(200).json(filteredJobDetails);
	} catch (error: unknown) {
		console.error("Error fetching appointment details:", error);
		if ((error as NodeJS.ErrnoException).code === "ENOENT") {
			console.log("File not found error");
			return res.status(404).json({ error: "Appointment details not found" });
		}
		console.log("General error");
		res.status(500).json({ error: "Failed to fetch appointment details" });
	}
}
