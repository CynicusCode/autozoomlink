import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { v4 as uuidv4 } from "uuid";

dayjs.extend(utc);
dayjs.extend(timezone);

export const handleSubmit = async (data, setValue, getValues, setError) => {
	try {
		const isJobNumberFetched = getValues("isJobNumberFetched");
		const manualTitleInput = getValues("manualTitle");
		let jobNumber;
		let manualTitle;

		if (isJobNumberFetched) {
			jobNumber = getValues("jobNumber");
			manualTitle = `Job #${jobNumber}`;
		} else {
			jobNumber = uuidv4();
			manualTitle = manualTitleInput || jobNumber;
		}

		const uiExpectedStartDate = getValues("uiExpectedStartDate");
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
			zoomMeetingId: zoomData.meeting.id,
			zoomStartLink: zoomData.meeting.start_url,
			zoomJoinLink: zoomData.meeting.join_url,
			zoomInvitation: zoomData.meeting.password,
			vriRoomNumber: 1,
		};

		const dbResponse = await fetch("/api/zoom/createAppointment", {
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
