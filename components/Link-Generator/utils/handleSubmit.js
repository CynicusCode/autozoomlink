import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

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

		// Calculate endDateTime using day.js
		const durationInMinutes =
			data.hours * 60 + Number.parseInt(data.minutes, 10);
		const endDateTime = dayjs(data.expectedStartDate)
			.add(durationInMinutes, "minute")
			.toISOString();

		// Prepare the payload for the database
		const payload = {
			jobNumber: data.jobNumber,
			manualTitle: data.manualTitle,
			date: new Date(data.expectedStartDate),
			time: new Date(data.expectedStartDate),
			durationHrs: data.hours,
			durationMins: data.minutes,
			endDateTime: endDateTime, // Set calculated endDateTime
			timeZone: data.timeZone,
			vriApproved: data.isVriApproved,
			vriLabel: data.isVirtualLabelInAddress,
			vriType: data.isVriType,
			status: data.jobStatus,
			videoLink: zoomData.meeting.join_url,
			requestorName: data.requestorName,
			requestorEmail: data.requestorEmail,
			createdByLLS: true,
			zoomMeetingId: zoomData.meeting.id,
			zoomStartLink: zoomData.meeting.start_url,
			zoomJoinLink: zoomData.meeting.join_url,
			zoomInvitation: zoomData.meeting.password,
			vriRoomNumber: 1,
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
