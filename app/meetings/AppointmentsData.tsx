// app/meetings/AppointmentsData.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchAppointments from "@/lib/fetchAppointments";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Meeting {
	jobNumber: string;
	date: string;
	timeZoneDisplayName: string;
	requiresAttention: boolean;
	thirdPartyVideoLink: string;
	status: string;
	link: string;
	vriRoom: string;
}

const AppointmentsPage = () => {
	// Use React Query to fetch appointments data
	const { data, error, isLoading } = useQuery<Meeting[]>({
		queryKey: ["appointments"],
		queryFn: fetchAppointments,
	});

	// Render loading state
	if (isLoading) return <div>Loading...</div>;

	// Render error state
	if (error) return <div>Error: {error.message}</div>;

	// Filter the data to include only the columns you want
	const filteredData = data?.map((appointment) => ({
		jobNumber: appointment.jobNumber,
		date: appointment.date,
		timeZoneDisplayName: appointment.timeZoneDisplayName,
		requiresAttention: appointment.requiresAttention,
		thirdPartyVideoLink: appointment.thirdPartyVideoLink,
		status: appointment.status,
		link: appointment.link,
		vriRoom: appointment.vriRoom,
	}));

	// Render data table if data is available
	return <DataTable columns={columns} data={filteredData || []} />;
};

export default AppointmentsPage;
