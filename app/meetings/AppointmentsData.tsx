// app/meetings/AppointmentsPage.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import fetchAppointments from "@/lib/fetchAppointments";
import { DataTable } from "./data-table";
import { columns, type Meeting } from "./columns";

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
		timeZone: appointment.timeZone,
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
