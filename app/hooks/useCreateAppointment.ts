import {
	useMutation,
	type UseMutationOptions,
	type UseMutationResult,
} from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import type {
	AppointmentData,
	AppointmentResponse,
} from "../types/appointmentTypes";

const createAppointment = async (
	data: AppointmentData,
): Promise<AppointmentResponse> => {
	const response: AxiosResponse<AppointmentResponse> = await axios.post(
		"/api/supabase/createAppointment",
		data,
	);
	return response.data;
};

export const useCreateAppointment = (
	options?: UseMutationOptions<AppointmentResponse, Error, AppointmentData>,
): UseMutationResult<AppointmentResponse, Error, AppointmentData> => {
	return useMutation<AppointmentResponse, Error, AppointmentData>({
		mutationFn: createAppointment,
		...options,
	});
};
