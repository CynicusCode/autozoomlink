// utils/handleSubmit.js

import { convertToUtc } from "@/components/Link-Generator/Date-time/dateUtils";

export const handleSubmit = async (data, setValue, getValues, setError) => {
	try {
		// Create Zoom meeting
		const zoomResponse = await fetch("/api/zoom/createMeeting", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				start_time: data.expectedStartDate,
				duration: data.hours * 60 + Number.parseInt(data.minutes, 10),
				timezone: data.timeZone,
			}),
		});

		const zoomData = await zoomResponse.json();

		if (!zoomData.success) {
			throw new Error(zoomData.message || "Failed to create Zoom meeting");
		}

		// Prepare the payload for the database
		const payload = {
			jobNumber: data.jobNumber,
			date: new Date(data.expectedStartDate),
			time: new Date(data.expectedStartDate),
			durationHrs: data.hours,
			durationMins: data.minutes,
			timeZone: data.timeZone,
			vriApproved: data.isVriApproved,
			vriLabel: data.isVirtualLabelInAddress,
			vriType: data.isVriType,
			status: "Scheduled",
			videoLink: zoomData.meeting.join_url,
			requestorName: "Your Name",
			requestorEmail: "your-email@example.com",
			createdByLLS: true,
			zoomMeetingId: zoomData.meeting.id,
			zoomStartLink: zoomData.meeting.start_url,
			zoomJoinLink: zoomData.meeting.join_url,
			zoomInvitation: zoomData.meeting.password,
			vriRoomNumber: null,
		};

		// Add your database submission logic here
		const response = await fetch("/api/appointments", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		const result = await response.json();
		console.log("Appointment created:", result);
	} catch (error) {
		console.error("Error creating appointment:", error);
		setError("submit", { message: error.message });
	}
};