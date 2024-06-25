import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { FormValues } from "../formSchema";
import type { AppointmentData } from "@/app/types/appointmentTypes";
import type { ZoomData } from "@/app/types/ZoomData";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const generateUniqueIdentifier = () => {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const randomLetter1 = letters[Math.floor(Math.random() * letters.length)];
	const randomLetter2 = letters[Math.floor(Math.random() * letters.length)];
	const randomNumber1 = Math.floor(Math.random() * 10);
	const randomNumber2 = Math.floor(Math.random() * 10);

	return `m${randomNumber1}${randomNumber2}${randomLetter1}${randomLetter2}`;
};

export const convertToUtc = (dateTime: string, timeZone: string): string => {
	console.log("Converting dateTime to UTC:", dateTime, timeZone);

	// First, try parsing with the exact format
	let parsedDate = dayjs(dateTime, "M/D/YYYY h:mm A", true);

	// If that fails, try a more lenient parsing
	if (!parsedDate.isValid()) {
		parsedDate = dayjs(dateTime);
	}

	console.log("Parsed Date (local):", parsedDate.format());

	if (!parsedDate.isValid()) {
		console.error("Invalid date format for:", dateTime);
		return "";
	}

	// Set the timezone and convert to UTC
	const utcDate = parsedDate.tz(timeZone, true).utc().format();
	console.log("Converted UTC Date:", utcDate);
	return utcDate;
};

export const getUtcStartDate = (dateTime: string) => {
	return dayjs.utc(dateTime);
};

export const createPayload = (
	data: FormValues,
	startDate: dayjs.Dayjs,
	endDateTime: string,
	zoomData: ZoomData,
	jobNumber: string,
): AppointmentData => {
	const payload = {
		jobNumber: jobNumber,
		manualTitle: data.manualTitle ?? "",
		date: startDate.toISOString(),
		durationHrs: data.hours ? Number(data.hours) : null,
		durationMins: data.minutes ? Number(data.minutes) : null,
		endDateTime: endDateTime,
		timeZone: data.timeZone ?? "",
		timeZoneDisplayName: data.timeZoneDisplayName ?? "",
		vriApproved: data.isVriApproved ?? false,
		vriLabel: data.isVirtualLabelInAddress ?? false,
		vriType: data.isVriType ?? false,
		status: data.jobStatus ?? "",
		videoLink: data.videoLinkField ?? "",
		requestorName: data.requestorName ?? "",
		requestorEmail: data.requestorEmail ?? "",
		createdByLLS: true,
		zoomMeetingId: zoomData.meeting.id.toString(),
		zoomStartLink: zoomData.meeting.start_url,
		zoomJoinLink: zoomData.meeting.join_url,
		zoomInvitation: zoomData.meeting.password,
		vriRoomNumber: 1,
	};
	console.log("Created Payload:", payload);
	return payload;
};

export const createZoomDetails = (
	data: FormValues,
	startDate: dayjs.Dayjs,
	zoomData: ZoomData,
) => {
	const zoomDetails = {
		title: data.manualTitle || "No Title Provided",
		time: startDate.tz(data.timeZone).format("MMMM D, YYYY h:mm A"),
		joinLink: zoomData.meeting.join_url,
		meetingId: zoomData.meeting.id.toString(),
		passcode: zoomData.meeting.password || "No Passcode",
		requestorEmail: data.requestorEmail || "",
	};
	console.log("Created Zoom Details:", zoomDetails);
	return zoomDetails;
};

export const ZoomMeetingDetails = {
	generateUniqueIdentifier,
	convertToUtc,
	getUtcStartDate,
	createPayload,
	createZoomDetails,
};
