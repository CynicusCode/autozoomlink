import {
	useMutation,
	type UseMutationOptions,
	type UseMutationResult,
} from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import type {
	ZoomMeetingData,
	ZoomMeetingResponse,
} from "../types/zoomMeetingTypes";

const createZoomMeeting = async (
	data: ZoomMeetingData,
): Promise<ZoomMeetingResponse> => {
	const response: AxiosResponse<ZoomMeetingResponse> = await axios.post(
		"/api/zoom/createMeeting",
		data,
	);
	return response.data;
};

export const useCreateZoomMeeting = (
	options?: UseMutationOptions<ZoomMeetingResponse, Error, ZoomMeetingData>,
): UseMutationResult<ZoomMeetingResponse, Error, ZoomMeetingData> => {
	return useMutation<ZoomMeetingResponse, Error, ZoomMeetingData>({
		mutationFn: createZoomMeeting,
		...options,
	});
};
