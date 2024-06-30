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
import { getTimeZoneDisplayName } from "../utils/timeZoneUtils";

/**
 * GenerateZoomLink Component
 * This component is responsible for handling the form submission to generate a Zoom link
 * and create an appointment. It also handles the opening and closing of a popup displaying the Zoom details.
 */
const GenerateZoomLink: React.FC<{ onClick: () => void }> = ({ onClick }) => {
	// React Hook Form context to handle form state and methods
	const { handleSubmit, getValues, setValue, setError, formState } =
		useFormContext<FormValues>();
	const { errors } = formState;

	// Local state for managing the popup visibility and Zoom details
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [zoomDetails, setZoomDetails] = useState({
		title: "",
		time: "",
		joinLink: "",
		meetingId: "",
		passcode: "",
		requestorEmail: "",
	});

	// Custom hooks for creating Zoom meeting and appointment
	const { mutate: createZoomMeeting, status: createZoomMeetingStatus } =
		useCreateZoomMeeting();
	const { mutate: createAppointment, status: createAppointmentStatus } =
		useCreateAppointment();

	// Flags to indicate the loading state of creating Zoom meeting and appointment
	const isCreatingZoomMeeting = createZoomMeetingStatus === "pending";
	const isCreatingAppointment = createAppointmentStatus === "pending";

	/**
	 * Form submission handler
	 * This function handles the form submission, generates the Zoom meeting, and creates the appointment.
	 */
	const onSubmit = useCallback(
		async (data: FormValues) => {
			try {
				console.log("Initial form values:", data);
				const { uiExpectedStartDate, timeZone } = data;

				// Ensure we have a job number
				if (!data.jobNumber) {
					const internalId = generateUniqueIdentifier();
					setValue("jobNumber", internalId);
					data.jobNumber = internalId;
				}

				// Handle timezone and convert start date
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

				// Handle missing timeZoneDisplayName
				if (!data.timeZoneDisplayName && timeZone) {
					data.timeZoneDisplayName = getTimeZoneDisplayName(timeZone);
					console.log(
						"Resolved timeZoneDisplayName:",
						data.timeZoneDisplayName,
					);
				}

				// Validate manual title
				if (!data.manualTitle) {
					setError("manualTitle", {
						type: "manual",
						message: "Manual title is required",
					});
					console.error("Manual title is missing");
					return;
				}

				// Validate expected start date after conversion
				if (!data.expectedStartDate) {
					console.error("Expected start date is missing after conversion.");
					throw new Error("Invalid start date");
				}

				// Validate and convert start date
				const startDate = ZoomMeetingDetails.getUtcStartDate(
					data.expectedStartDate,
				);
				if (!startDate.isValid()) {
					console.error("Invalid start date:", data.expectedStartDate);
					throw new Error("Invalid start date");
				}

				// Calculate meeting duration and end date/time
				const duration = Number(data.hours) * 60 + Number(data.minutes);
				const endDateTime = startDate.add(duration, "minute").toISOString();

				// Create Zoom meeting
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

							// Create appointment payload
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

							// Send appointment data to API
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

	/**
	 * Handler to close the Zoom details popup
	 */
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
				isCreatingAppointment={isCreatingAppointment}
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
