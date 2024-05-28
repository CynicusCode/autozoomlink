import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DateTimeHandler } from "../Date-time/dateUtils";

dayjs.extend(utc);
dayjs.extend(timezone);

export const handleSubmit = async (data, setValue, getValues, setError) => {
	try {
		console.log("Initial form data:", data);

		const zoomData = {
			meeting: {
				id: "123456789",
				start_url: "https://zoom.us/start_url",
				join_url: "https://zoom.us/join_url",
				password: "password123",
			},
		};

		const durationInMinutes =
			data.hours * 60 + Number.parseInt(data.minutes, 10);
		const endDateTime = dayjs(data.expectedStartDate)
			.add(durationInMinutes, "minute")
			.toISOString();

		const payload = {
			jobNumber: data.manualTitle,
			manualTitle: data.manualTitle,
			date: data.expectedStartDate,
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

		console.log("Meeting created, payload:", payload);
	} catch (error) {
		console.error("Error creating appointment:", error);
		setError("submit", { message: error.message });
	}
};
