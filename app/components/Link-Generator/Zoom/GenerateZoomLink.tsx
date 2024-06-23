// app/components/Link-Generator/Zoom/GenerateZoomLink.tsx
import type React from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import { DateTimeHandler } from "../Date-time/dateUtils";
import { useCreateZoomMeeting } from "../../../hooks/useCreateZoomMeeting";
import { useCreateAppointment } from "../../../hooks/useCreateAppointment";
import type { FormValues } from "../formSchema";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ZoomLinkPopup from "./ZoomLinkPopup";

dayjs.extend(utc);
dayjs.extend(timezone);

interface GenerateZoomLinkProps {
	onClick: () => void;
}

const GenerateZoomLink: React.FC<GenerateZoomLinkProps> = ({ onClick }) => {
	const { handleSubmit, getValues, setValue, setError } =
		useFormContext<FormValues>();
	const { mutate: createZoomMeeting, status: createZoomMeetingStatus } =
		useCreateZoomMeeting();
	const isCreatingZoomMeeting = createZoomMeetingStatus === "pending";
	const { mutate: createAppointment, status: createAppointmentStatus } =
		useCreateAppointment();
	const isCreatingAppointment = createAppointmentStatus === "pending";

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [zoomDetails, setZoomDetails] = useState({
		title: "",
		time: "",
		joinLink: "",
		meetingId: "",
		passcode: "",
		requestorEmail: "",
	});

	const onSubmit = async (data: FormValues) => {
		try {
			console.log("Initial form values:", data);

			const { uiExpectedStartDate, timeZone } = data;

			let utcDate: string | undefined;
			if (uiExpectedStartDate) {
				utcDate = DateTimeHandler.convertToUtc(
					uiExpectedStartDate,
					timeZone ?? "",
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

			if (!data.expectedStartDate) {
				console.error("Expected start date is missing after conversion.");
				throw new Error("Invalid start date");
			}

			const startDate = dayjs.utc(data.expectedStartDate);
			if (!startDate.isValid()) {
				console.error("Invalid start date:", data.expectedStartDate);
				throw new Error("Invalid start date");
			}

			const duration = Number(data.hours) * 60 + Number(data.minutes);
			const endDateTime = startDate.add(duration, "minute").toISOString();

			createZoomMeeting(
				{
					topic: data.manualTitle,
					start_time: startDate.tz(timeZone).format(), // Convert to the specified time zone format
					duration,
					timezone: timeZone ?? "", // Provide default timeZone value
					settings: {
						join_before_host: true,
						participant_video: true,
						host_video: true,
					},
				},
				{
					onSuccess: (zoomData) => {
						console.log("Data sent to Zoom API:", {
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

						const payload = {
							jobNumber: data.jobNumber,
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

						console.log("Payload for createAppointment:", payload);

						createAppointment(payload, {
							onSuccess: (dbData) => {
								console.log("Appointment created successfully:", dbData);
								setZoomDetails({
									title: data.manualTitle || "No Title Provided",
									time: startDate.tz(timeZone).format("MMMM D, YYYY h:mm A"),
									joinLink: zoomData.meeting.join_url,
									meetingId: zoomData.meeting.id.toString(),
									passcode: zoomData.meeting.password || "No Passcode",
									requestorEmail: data.requestorEmail || "",
								});
								setIsPopupOpen(true);
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
		onClick(); // Call the onClick handler
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
			<ZoomLinkPopup
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				zoomDetails={zoomDetails}
			/>
		</div>
	);
};

export default GenerateZoomLink;
