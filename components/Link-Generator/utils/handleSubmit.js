import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { v4 as uuidv4 } from "uuid";

dayjs.extend(utc);
dayjs.extend(timezone);

export const handleSubmit = async (data, setValue, getValues, setError) => {
	try {
		// Ensure manualTitle is a number or use UUID
		const isJobNumberFetched = getValues("isJobNumberFetched");
		let jobNumber;
		let manualTitle;

		if (isJobNumberFetched) {
			jobNumber = getValues("jobNumber");
			manualTitle = `Job #${jobNumber}`;
		} else {
			jobNumber = uuidv4();
			manualTitle = jobNumber;
		}

		const uiExpectedStartDate = getValues("uiExpectedStartDate");
		const timeZone = getValues("timeZone");

		// Parse the uiExpectedStartDate in the user's timezone
		const parsedDate = dayjs.tz(
			uiExpectedStartDate,
			"MM/DD/YYYY hh:mm A",
			timeZone,
		);
		const expectedStartDate = parsedDate.toISOString();
		console.log("Converted expectedStartDate to ISO:", expectedStartDate);

		const durationInMinutes =
			data.hours * 60 + Number.parseInt(data.minutes, 10);
		const endDateTimeUTC = parsedDate
			.add(durationInMinutes, "minute")
			.utc()
			.toISOString();
		console.log("Calculated endDateTime:", endDateTimeUTC);

		// Make Zoom API call to create a meeting
		const zoomResponse = await fetch("/api/zoom/createMeeting", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				topic: data.manualTitle,
				start_time: parsedDate.format(), // Local time in ISO format
				duration: data.hours * 60 + Number.parseInt(data.minutes, 10),
				timezone: timeZone, // Pass the user's timezone
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
		console.log("Zoom API response:", JSON.stringify(zoomData, null, 2));

		const payload = {
			jobNumber,
			manualTitle: jobNumber,
			date: expectedStartDate, // Keep this as an ISO string in UTC
			durationHrs: data.hours ? Number.parseInt(data.hours, 10) : null,
			durationMins: data.minutes ? Number.parseInt(data.minutes, 10) : null,
			endDateTime: endDateTimeUTC, // Keep this as an ISO string in UTC
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

		console.log("Meeting created, payload:", payload);

		// Commented out the API calls for testing purposes
		// const dbResponse = await fetch("/api/zoom/createAppointment", {
		//   method: "POST",
		//   headers: {
		//     "Content-Type": "application/json",
		//   },
		//   body: JSON.stringify(payload),
		// });

		// if (!dbResponse.ok) {
		//   const errorText = await dbResponse.text();
		//   throw new Error(`Database API error: ${errorText}`);
		// }

		// const dbData = await dbResponse.json();
		// console.log("Payload successfully inserted into the database:", dbData);
	} catch (error) {
		console.error("Error creating appointment:", error);
		setError("submit", { message: error.message });
	}
};
