import React, { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import ZoomLinkPopup from "./ZoomLinkPopup";
import {
	ZoomMeetingDetails,
	generateUniqueIdentifier,
} from "./ZoomMeetingDetails";
import { SubmitButton } from "./SubmitButton";
import { useCreateZoomMeeting } from "../../../hooks/useCreateZoomMeeting";
import { useCreateAppointment } from "../../../hooks/useCreateAppointment";
import type { FormValues } from "../formSchema";
import type { ZoomData, ZoomMeetingResponse } from "@/app/types/ZoomData";

const GenerateZoomLink: React.FC<{ onClick: () => void }> = ({ onClick }) => {
	const { handleSubmit, getValues, setValue, setError, formState } =
		useFormContext<FormValues>();
	const { errors } = formState;

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [zoomDetails, setZoomDetails] = useState({
		title: "",
		time: "",
		joinLink: "",
		meetingId: "",
		passcode: "",
		requestorEmail: "",
	});

	const { mutate: createZoomMeeting, status: createZoomMeetingStatus } =
		useCreateZoomMeeting();
	const { mutate: createAppointment, status: createAppointmentStatus } =
		useCreateAppointment();

	const isCreatingZoomMeeting = createZoomMeetingStatus === "pending";
	const isCreatingAppointment = createAppointmentStatus === "pending";

	const onSubmit = useCallback(
		async (data: FormValues) => {
			try {
				console.log("Initial form values:", data);
				const { uiExpectedStartDate, timeZone } = data;

				if (!data.jobNumber) {
					const internalId = generateUniqueIdentifier();
					setValue("jobNumber", internalId);
					data.jobNumber = internalId;
				}

				let utcDate: string | undefined;
				if (uiExpectedStartDate) {
					console.log("Converting uiExpectedStartDate to UTC");
					utcDate = ZoomMeetingDetails.convertToUtc(
						uiExpectedStartDate,
						timeZone ?? "",
					);
					if (!utcDate) {
						setError("uiExpectedStartDate", {
							type: "manual",
							message: "Invalid time value",
						});
						return;
					}
					console.log("Converted UTC Date:", utcDate);
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

				if (!data.expectedStartDate) {
					console.error("Expected start date is missing after conversion.");
					throw new Error("Invalid start date");
				}

				const startDate = ZoomMeetingDetails.getUtcStartDate(
					data.expectedStartDate,
				);
				if (!startDate.isValid()) {
					console.error("Invalid start date:", data.expectedStartDate);
					throw new Error("Invalid start date");
				}

				const duration = Number(data.hours) * 60 + Number(data.minutes);
				const endDateTime = startDate.add(duration, "minute").toISOString();

				createZoomMeeting(
					{
						topic: data.manualTitle,
						start_time: startDate.tz(timeZone).format(),
						duration,
						timezone: timeZone ?? "",
						settings: {
							join_before_host: true,
							participant_video: true,
							host_video: true,
						},
					},
					{
						onSuccess: async (zoomData: ZoomMeetingResponse) => {
							const jobNumber = data.jobNumber || generateUniqueIdentifier();
							const convertedZoomData: ZoomData = {
								meeting: {
									id: zoomData.meeting.id.toString(),
									start_url: zoomData.meeting.start_url,
									join_url: zoomData.meeting.join_url,
									password: zoomData.meeting.password,
								},
							};

							const appointmentData = ZoomMeetingDetails.createPayload(
								data,
								startDate,
								endDateTime,
								convertedZoomData,
								jobNumber,
							);

							console.log(
								"Appointment Data to be sent to API:",
								appointmentData,
							);

							const response = await fetch(
								"http://localhost:3000/api/supabase/createAppointment",
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify(appointmentData),
								},
							);

							if (!response.ok) {
								throw new Error("Error creating appointment");
							}

							const dbData = await response.json();
							console.log("Appointment created successfully:", dbData);
							const zoomDetailsData = ZoomMeetingDetails.createZoomDetails(
								data,
								startDate,
								convertedZoomData,
							);
							console.log("Setting Zoom details:", zoomDetailsData);
							setZoomDetails(zoomDetailsData);
							setIsPopupOpen(true);
							console.log("Popup state set to open");
						},
						onError: (error: Error) => {
							setError("uiExpectedStartDate", {
								type: "manual",
								message: error.message,
							});
						},
					},
				);
			} catch (error: unknown) {
				setError("uiExpectedStartDate", {
					type: "manual",
					message: (error as Error).message,
				});
			}
			onClick();
		},
		[createZoomMeeting, setError, setValue, onClick],
	);

	const handleClosePopup = useCallback(() => {
		console.log("Closing popup");
		setIsPopupOpen(false);
	}, []);

	return (
		<div className="space-x-2">
			<SubmitButton
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				errors={errors}
				isCreatingZoomMeeting={isCreatingZoomMeeting}
				isCreatingAppointment={isCreatingAppointment} // Pass the missing prop
			/>
			{isPopupOpen && (
				<ZoomLinkPopup
					isOpen={isPopupOpen}
					onClose={handleClosePopup}
					zoomDetails={zoomDetails}
				/>
			)}
		</div>
	);
};

export default React.memo(GenerateZoomLink);
