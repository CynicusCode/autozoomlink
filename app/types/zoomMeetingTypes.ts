// types/zoomMeetingTypes.ts
export interface ZoomMeetingData {
	topic: string;
	start_time: string;
	duration: number;
	timezone: string;
	settings: {
		join_before_host: boolean;
		participant_video: boolean;
		host_video: boolean;
	};
}

export interface ZoomMeetingResponse {
	meeting: {
		id: number;
		start_url: string;
		join_url: string;
		password: string;
	};
}
