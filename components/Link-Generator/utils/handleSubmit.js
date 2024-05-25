import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const handleSubmit = async (data, setValue, getValues, setError) => {
	try {
		// Log the initial data to debug
		console.log("Initial form data:", data);

		// Create Zoom meeting
		const zoomResponse = await fetch("/api/zoom/createMeeting", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				topic: data.manualTitle,
				start_time: data.expectedStartDate,
				duration: data.hours * 60 + Number.parseInt(data.minutes, 10),
				timezone: data.timeZone,
				settings: {
					join_before_host: true,
					participant_video: true,
					host_video: true,
				},
			}),
		});

		if (!zoomResponse.ok) {
			const errorText = await zoomResponse.text();
			throw new Error(`Zoom API error: ${errorText}`);
		}

		const zoomData = await zoomResponse.json();

		// Log the entire Zoom API response to study the structure
		console.log("Zoom API response:", JSON.stringify(zoomData, null, 2));

		// Calculate endDateTime using dayjs
		const durationInMinutes =
			data.hours * 60 + Number.parseInt(data.minutes, 10);
		const endDateTime = dayjs(data.expectedStartDate)
			.add(durationInMinutes, "minute")
			.toISOString();

		// Prepare the payload for logging
		const payload = {
			jobNumber: data.jobNumber,
			manualTitle: data.manualTitle,
			date: new Date(data.expectedStartDate),
			time: new Date(data.expectedStartDate),
			durationHrs: data.hours,
			durationMins: data.minutes,
			endDateTime: endDateTime,
			timeZone: data.timeZone,
			vriApproved: data.isVriApproved,
			vriLabel: data.isVirtualLabelInAddress,
			vriType: data.isVriType,
			status: data.jobStatus,
			videoLink: data.videoLinkField,
			requestorName: data.requestorName,
			requestorEmail: data.requestorEmail,
			createdByLLS: true,
			zoomMeetingId: zoomData.meeting.id,
			zoomStartLink: zoomData.meeting.start_url,
			zoomJoinLink: zoomData.meeting.join_url,
			zoomInvitation: zoomData.meeting.password,
			vriRoomNumber: 1,
		};

		// Log the payload for now
		console.log("Meeting created, payload:", payload);
	} catch (error) {
		console.error("Error creating appointment:", error);
		setError("submit", { message: error.message });
	}
};
