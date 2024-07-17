import React, { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import ZoomLinkPopup from "./ZoomLinkPopup";
import {
	ZoomMeetingDetails,
	generateUniqueIdentifier,
} from "./ZoomMeetingDetails";
import { useCreateZoomMeeting } from "../../../hooks/useCreateZoomMeeting";
import { useCreateAppointment } from "../../../hooks/useCreateAppointment";
import type { FormValues } from "../formSchema";
import type { ZoomData, ZoomMeetingResponse } from "@/app/types/ZoomData";
import { getTimeZoneDisplayName } from "../utils/timeZoneUtils";
import { Button } from "@/components/ui/button";

type ZoomDetailsType = ReturnType<typeof ZoomMeetingDetails.createZoomDetails>;

const GenerateZoomLink: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
	const { handleSubmit, getValues, setValue, setError, formState } =
		useFormContext<FormValues>();
	const { errors } = formState;

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [zoomDetails, setZoomDetails] = useState<ZoomDetailsType | null>(null);

	const { mutate: createZoomMeeting, status: createZoomMeetingStatus } =
		useCreateZoomMeeting();
	const { mutate: createAppointment, status: createAppointmentStatus } =
		useCreateAppointment();

	const isCreatingZoomMeeting = createZoomMeetingStatus === "pending";
	const isCreatingAppointment = createAppointmentStatus === "pending";

	const onSubmit = useCallback(
		async (data: FormValues) => {
			console.log("onSubmit called with data:", data);
			try {
				const { uiExpectedStartDate, timeZone } = data;

				if (!data.jobNumber) {
					const internalId = generateUniqueIdentifier();
					setValue("jobNumber", internalId);
					data.jobNumber = internalId;
				}

				let utcDate: string | undefined;
				if (uiExpectedStartDate) {
					console.log(
						"Converting uiExpectedStartDate to UTC:",
						uiExpectedStartDate,
						timeZone,
					);
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
					setValue("expectedStartDate", utcDate);
					data.expectedStartDate = utcDate;
				}

				if (!data.timeZoneDisplayName && timeZone) {
					data.timeZoneDisplayName = getTimeZoneDisplayName(timeZone);
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

				console.log("Creating Zoom meeting with data:", {
					topic: data.manualTitle,
					start_time: startDate.tz(timeZone).format(),
					duration,
					timezone: timeZone ?? "",
					settings: {
						join_before_host: true,
						participant_video: true,
						host_video: true,
					},
				});

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
							console.log("Zoom meeting created successfully:", zoomData);
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

							console.log("Creating appointment with data:", appointmentData);

							const response = await fetch("/api/supabase/createAppointment", {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify(appointmentData),
							});

							const responseText = await response.text(); // Capture the raw response text
							console.log("Raw response text:", responseText);

							if (!response.ok) {
								console.error(
									"Error creating appointment:",
									response.statusText,
									responseText,
								);
								throw new Error(
									`Error creating appointment: ${response.statusText}`,
								);
							}

							const dbData = JSON.parse(responseText); // Parse the raw response text
							console.log("Appointment created successfully:", dbData);
							const zoomDetailsData = ZoomMeetingDetails.createZoomDetails(
								data,
								startDate,
								convertedZoomData,
							);
							setZoomDetails(zoomDetailsData);
							setIsPopupOpen(true); // Automatically open the popup
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
				console.error("Error in onSubmit:", error);
				setError("uiExpectedStartDate", {
					type: "manual",
					message: (error as Error).message,
				});
			}
			if (onClick) onClick();
		},
		[createZoomMeeting, setError, setValue, onClick],
	);

	const handleOpenPopup = useCallback(() => {
		if (zoomDetails) {
			setIsPopupOpen(true);
		} else {
			console.error("No Zoom details available");
			// You might want to show an error message to the user here
		}
	}, [zoomDetails]);

	const handleClosePopup = useCallback(() => {
		setIsPopupOpen(false);
	}, []);

	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-2">
				{zoomDetails ? (
					<Button onClick={handleOpenPopup}>See Invitation</Button>
				) : (
					<Button
						onClick={() => {
							console.log("Button clicked, calling handleSubmit");
							handleSubmit(onSubmit)();
							if (Object.keys(errors).length > 0) {
								console.error("Validation errors:", errors);
							}
						}}
						style={{ backgroundColor: "#0B5CFF" }}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						disabled={isCreatingZoomMeeting || isCreatingAppointment}
					>
						{isCreatingZoomMeeting || isCreatingAppointment
							? "Loading..."
							: "Generate Zoom Link"}
					</Button>
				)}
			</div>
			{isPopupOpen && zoomDetails && (
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
