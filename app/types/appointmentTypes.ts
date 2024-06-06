// types/appointmentTypes.ts
export interface AppointmentData {
	jobNumber: string;
	manualTitle: string;
	date: string;
	durationHrs: number | null;
	durationMins: number | null;
	endDateTime: string;
	timeZone: string;
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

export interface AppointmentResponse {
	id: number;
	jobNumber: string;
}
