//app/types/ZoomData.ts This file contains the types for the ZoomData interface. This interface is used in the ZoomLinkPopup component to display the Zoom meeting details. The ZoomData interface contains the ZoomMeeting interface, which defines the properties of a Zoom meeting. The ZoomMeeting interface includes properties such as id, start_url, join_url, and password. The ZoomData interface also includes the AppointmentData interface, which defines the properties of an appointment. The AppointmentData interface includes properties such as jobNumber, manualTitle, date, durationHrs, durationMins, endDateTime, timeZone, timeZoneDisplayName, vriApproved, vriLabel, vriType, status, videoLink, requestorName, requestorEmail, createdByLLS, zoomMeetingId, zoomStartLink, zoomJoinLink, zoomInvitation, and vriRoomNumber. The ZoomMeetingResponse interface is used to define the response from the Zoom API when creating a Zoom meeting. The ZoomMeetingResponse interface includes the ZoomMeeting interface, which contains the properties of a Zoom meeting. The ZoomData interface is imported in the GenerateZoomLink component to display the Zoom meeting details. The ZoomData interface is also used in the ZoomMeetingDetails component to create the payload for the appointment data. The ZoomData interface is used to define the types of the Zoom meeting data and the appointment data in the application. This helps to ensure type safety and prevent errors when working with Zoom meeting data and appointment data in the application.// Define the ZoomMeeting interface

export interface ZoomMeeting {
	id: string; // Ensure this is a string
	start_url: string;
	join_url: string;
	password: string;
}

export interface ZoomData {
	meeting: ZoomMeeting;
}

export interface AppointmentData {
	jobNumber: string;
	manualTitle: string;
	date: string;
	durationHrs: number | null;
	durationMins: number | null;
	endDateTime: string;
	timeZone: string;
	timeZoneDisplayName: string;
	vriApproved: boolean;
	vriLabel: boolean;
	vriType: boolean;
	status: string;
	videoLink: string;
	requestorName: string;
	requestorEmail: string;
	createdByLLS: boolean;
	zoomMeetingId: string;
	zoomStartLink: string;
	zoomJoinLink: string;
	zoomInvitation: string;
	vriRoomNumber: number;
}

export interface ZoomMeetingResponse {
	meeting: {
		id: number; // Adjust this to number if that's what the API returns
		start_url: string;
		join_url: string;
		password: string;
	};
}
