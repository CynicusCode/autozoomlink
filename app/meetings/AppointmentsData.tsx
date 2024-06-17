// app/meetings/AppointmentsData.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchAppointments from "@/lib/fetchAppointments";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DateTimeHandler } from "../components/Link-Generator/Date-time/dateUtils";

interface Meeting {
	jobNumber: string;
	date: string;
	timeZoneDisplayName: string;
	requiresAttention: boolean;
	videoLink: string;
	status: string;
	zoomJoinLink: string;
	vriRoomNumber: number;
	timeZone: string;
	vri: boolean;
	vriLabel: boolean;
	vriType: boolean;
	createdbyLLS: boolean;
}

const AppointmentsData = () => {
	// Use React Query to fetch appointments data
	const { data, error, isLoading } = useQuery<Meeting[]>({
		queryKey: ["appointments"],
		queryFn: fetchAppointments,
	});

	// Render loading state
	if (isLoading) return <div>Loading...</div>;

	// Render error state
	if (error) return <div>Error: {error.message}</div>;

	// Convert the API provided date and time to the customer's local time
	const formattedData = data?.map((appointment) => ({
		jobNumber: appointment.jobNumber,
		date: DateTimeHandler.formatDateTimeForDisplay(
			appointment.date,
			appointment.timeZone,
		),
		timeZoneDisplayName: appointment.timeZoneDisplayName,
		requiresAttention: appointment.requiresAttention,
		videoLink: appointment.videoLink,
		status: appointment.status,
		zoomJoinLink: appointment.zoomJoinLink,
		vriRoomNumber: appointment.vriRoomNumber,
		vri: appointment.vri,
		vriLabel: appointment.vriLabel,
		vriType: appointment.vriType,
		createdbyLLS: appointment.createdbyLLS,
	}));

	return <DataTable columns={columns} data={formattedData || []} />;
};

export default AppointmentsData;
