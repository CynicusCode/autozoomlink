import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const handleSubmit = async (data, setValue, getValues, setError) => {
	try {
		console.log("Starting handleSubmit with data:", data);

		const isJobNumberFetched = getValues("isJobNumberFetched");
		const manualTitleInput = getValues("manualTitle");
		let jobNumber = getValues("jobNumber");

		if (!jobNumber) {
			jobNumber = data.jobNumber;
		}

		const manualTitle = manualTitleInput || jobNumber;

		const uiExpectedStartDate = getValues("uiExpectedStartDate");
		console.log("uiExpectedStartDate at handleSubmit:", uiExpectedStartDate);
		const timeZone = getValues("timeZone");

		if (
			!uiExpectedStartDate ||
			!dayjs(uiExpectedStartDate, "MM/DD/YYYY hh:mm A", true).isValid()
		) {
			throw new Error("Invalid date format");
		}

		const parsedDate = dayjs.tz(
			uiExpectedStartDate,
			"MM/DD/YYYY hh:mm A",
			timeZone,
		);

		if (!parsedDate.isValid()) {
			throw new Error("Failed to parse date");
		}

		const expectedStartDate = parsedDate.toISOString();
		const durationInMinutes =
			data.hours * 60 + Number.parseInt(data.minutes, 10);
		const endDateTimeUTC = parsedDate
			.add(durationInMinutes, "minute")
			.utc()
			.toISOString();
		console.log("Parsed date:", parsedDate.format());

		const zoomResponse = await fetch("/api/zoom/createMeeting", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				topic: manualTitle,
				start_time: parsedDate.format(),
				duration: data.hours * 60 + Number.parseInt(data.minutes, 10),
				timezone: timeZone,
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
		console.log("Zoom data received:", zoomData);

		const payload = {
			jobNumber,
			manualTitle,
			date: expectedStartDate,
			durationHrs: data.hours ? Number.parseInt(data.hours, 10) : null,
			durationMins: data.minutes ? Number.parseInt(data.minutes, 10) : null,
			endDateTime: endDateTimeUTC,
			timeZone: timeZone,
			vriApproved: data.isVriApproved,
			vriLabel: data.isVirtualLabelInAddress,
			vriType: data.isVriType,
			status: data.jobStatus,
			videoLink: data.videoLinkField,
			requestorName: data.requestorName,
			requestorEmail: data.requestorEmail,
			createdByLLS: true,
			zoomMeetingId: zoomData.meeting.id.toString(),
			zoomStartLink: zoomData.meeting.start_url,
			zoomJoinLink: zoomData.meeting.join_url,
			zoomInvitation: zoomData.meeting.password,
			vriRoomNumber: 1,
		};

		console.log("Payload being sent to database:", payload);

		const dbResponse = await fetch("/api/supabase/createAppointment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!dbResponse.ok) {
			const errorText = await dbResponse.text();
			throw new Error(`Database API error: ${errorText}`);
		}

		const dbData = await dbResponse.json();
		console.log("Payload successfully inserted into the database:", dbData);
	} catch (error) {
		console.error("Error creating appointment:", error);
		setError("submit", { message: error.message });
	}
};
