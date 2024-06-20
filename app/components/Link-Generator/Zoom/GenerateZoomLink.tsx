// app/components/Link-Generator/Zoom/GenerateZoomLink.tsx
"use client";

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
import { useAppointments } from "@/app/meetings/AppointmentsData";

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

	const { appointments, setAppointments } = useAppointments();

	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [zoomDetails, setZoomDetails] = useState({
		title: "",
		time: "",
		joinLink: "",
		meetingId: "",
		passcode: "",
		requestorEmail: "",
	});

	const findAvailableRoom = (
		startDate: string,
		endDate: string,
	): number | null => {
		const occupiedRooms = appointments.reduce((acc, appointment) => {
			if (appointment.vriRoomNumber !== null) {
				const appointmentStart = dayjs(appointment.date);
				const appointmentEnd = appointmentStart.add(
					appointment.durationMins,
					"minute",
				);

				if (
					(appointmentStart.isBefore(endDate) &&
						appointmentEnd.isAfter(startDate)) ||
					appointmentStart.isSame(startDate) ||
					appointmentEnd.isSame(endDate)
				) {
					acc.add(appointment.vriRoomNumber);
				}
			}
			return acc;
		}, new Set<number>());

		for (let room = 1; room <= 10; room++) {
			// Assuming you have 10 rooms
			if (!occupiedRooms.has(room)) {
				return room;
			}
		}
		return null;
	};

	const onSubmit = async (data: FormValues) => {
		try {
			console.log("Initial form values:", data);

			const { uiExpectedStartDate, timeZone } = data;
			console.log(
				"uiExpectedStartDate before conversion:",
				uiExpectedStartDate,
			);

			let utcDate: string | undefined;
			if (uiExpectedStartDate) {
				utcDate = DateTimeHandler.convertToUtc(
					uiExpectedStartDate,
					timeZone ?? "",
				);
				console.log("Converted UTC date:", utcDate);
				setValue("expectedStartDate", utcDate);
				data.expectedStartDate = utcDate;
			}

			console.log("Data after conversion:", data);

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

			console.log("Start date:", startDate.toISOString());

			const duration = Number(data.hours) * 60 + Number(data.minutes);
			const endDateTime = startDate.add(duration, "minute").toISOString();

			console.log("End date time:", endDateTime);

			const availableRoom = findAvailableRoom(
				startDate.toISOString(),
				endDateTime,
			);
			if (availableRoom === null) {
				console.error("No available rooms");
				setError("uiExpectedStartDate", {
					type: "manual",
					message: "No available rooms",
				});
				return;
			}

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
							id: "", // Set this if available or let the backend set it
							jobNumber: data.jobNumber,
							manualTitle: data.manualTitle ?? "",
							date: startDate.toISOString(),
							durationHrs: data.hours ? Number(data.hours) : 0,
							durationMins: data.minutes ? Number(data.minutes) : 0,
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
							zoomJoinLink: zoomData.meeting.join_url,
							vriRoomNumber: availableRoom, // Assign the available room
							createdAt: new Date().toISOString(), // Set this appropriately
							requiresAttention: false, // Set this based on your logic
							vri: false, // Set this based on your logic
							createdbyLLS: true, // Set this based on your logic
							zoomMeetingId: zoomData.meeting.id.toString(),
							zoomStartLink: zoomData.meeting.start_url,
							zoomInvitation: zoomData.meeting.password,
						};

						console.log("Payload for createAppointment:", payload);

						createAppointment(payload, {
							onSuccess: (dbData) => {
								console.log("Appointment created successfully:", dbData);
								setAppointments((prevAppointments) => [
									...prevAppointments,
									payload,
								]); // Optimistically update the local state
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
