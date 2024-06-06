"use client";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../../ui/button";
import { DateTimeHandler } from "../Date-time/dateUtils";
import { useCreateZoomMeeting } from "../../../hooks/useCreateZoomMeeting";
import { useCreateAppointment } from "../../../hooks/useCreateAppointment";
import type { JobDetails } from "../../../types/jobDetails";

interface FormValues extends JobDetails {
	uiExpectedStartDate: string;
	hours: string;
	minutes: string;
	expectedStartDate: string;
	manualTitle: string;
}

const GenerateZoomLink: React.FC = () => {
	const { handleSubmit, getValues, setValue, setError } =
		useFormContext<FormValues>();
	const { mutate: createZoomMeeting, status: createZoomMeetingStatus } =
		useCreateZoomMeeting();
	const isCreatingZoomMeeting = createZoomMeetingStatus === "pending";
	const { mutate: createAppointment, status: createAppointmentStatus } =
		useCreateAppointment();
	const isCreatingAppointment = createAppointmentStatus === "pending";

	const onSubmit = (data: FormValues) => {
		try {
			const { uiExpectedStartDate, timeZone } = data;

			if (uiExpectedStartDate) {
				const utcDate = DateTimeHandler.convertToUtc(
					uiExpectedStartDate,
					timeZone,
				);
				setValue("expectedStartDate", utcDate);
				data.expectedStartDate = utcDate;
			}

			if (!data.manualTitle) {
				setError("manualTitle", {
					type: "manual",
					message: "Manual title is required",
				});
				console.error("Manual title is missing");
				return;
			}

			const startDate = data.expectedStartDate || "";
			const duration = Number(data.hours) * 60 + Number(data.minutes);

			createZoomMeeting(
				{
					topic: data.manualTitle,
					start_time: startDate,
					duration,
					timezone: timeZone,
					settings: {
						join_before_host: true,
						participant_video: true,
						host_video: true,
					},
				},
				{
					onSuccess: (zoomData) => {
						const endDateTime = new Date(
							new Date(startDate).getTime() + duration * 60000,
						).toISOString();

						const payload = {
							jobNumber: data.jobNumber,
							manualTitle: data.manualTitle,
							date: startDate,
							durationHrs: data.hours ? Number(data.hours) : null,
							durationMins: data.minutes ? Number(data.minutes) : null,
							endDateTime,
							timeZone: data.timeZone,
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

						createAppointment(payload, {
							onSuccess: (dbData) => {
								console.log("Appointment created successfully:", dbData);
							},
							onError: (error: Error) => {
								console.error("Error creating appointment:", error);
								setError("uiExpectedStartDate", {
									type: "manual",
									message: error.message,
								});
							},
						});
					},
					onError: (error: Error) => {
						console.error("Error creating Zoom meeting:", error);
						setError("uiExpectedStartDate", {
							type: "manual",
							message: error.message,
						});
					},
				},
			);
		} catch (error: unknown) {
			console.error("Error handling submission:", error);
			setError("uiExpectedStartDate", {
				type: "manual",
				message: (error as Error).message,
			});
		}
	};

	return (
		<div className="space-x-2">
			<Button
				onClick={handleSubmit(onSubmit)}
				style={{ backgroundColor: "#0B5CFF" }}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				disabled={isCreatingZoomMeeting || isCreatingAppointment}
			>
				{isCreatingZoomMeeting || isCreatingAppointment
					? "Loading..."
					: "Generate Zoom Link"}
			</Button>
		</div>
	);
};

export default GenerateZoomLink;
