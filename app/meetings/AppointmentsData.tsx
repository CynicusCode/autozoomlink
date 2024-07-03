"use client";

import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchAppointments from "@/lib/fetchAppointments";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DateTimeHandler } from "../components/Link-Generator/Date-time/dateUtils";
import DataTableSkeleton from "../components/Skeleton/DataTableSkeleton"; // Importing the DataTableSkeleton

interface Meeting {
	jobNumber: string;
	date: string;
	timeZoneDisplayName: string;
	requiresAttention: boolean;
	videoLink: string;
	status: string;
	zoomJoinLink: string;
	vriRoomNumber: number | null;
	timeZone: string;
	vri: boolean;
	vriLabel: boolean;
	vriType: boolean;
	createdbyLLS: boolean;
}

interface AppointmentsDataProps {
	filter: string;
	onCountsChange: (counts: Record<string, number>) => void;
	onFilterChange: (filter: string) => void;
}

const AppointmentsData = ({
	filter,
	onCountsChange,
	onFilterChange,
}: AppointmentsDataProps) => {
	console.log("Current filter:", filter);

	// Use React Query to fetch appointments data
	const { data, error, isLoading } = useQuery<Meeting[]>({
		queryKey: ["appointments"],
		queryFn: fetchAppointments,
	});

	// Convert the API provided date and time to the customer's local time
	const formattedData = useMemo(() => {
		return (
			data?.map((appointment) => ({
				jobNumber: appointment.jobNumber,
				date: DateTimeHandler.formatDateTimeForDisplay(
					appointment.date,
					appointment.timeZone,
				),
				timeZoneDisplayName: appointment.timeZoneDisplayName,
				requiresAttention: appointment.requiresAttention || false, // Ensure boolean value
				videoLink: appointment.videoLink || "", // Ensure string value
				status: appointment.status || "", // Ensure string value
				zoomJoinLink: appointment.zoomJoinLink || "", // Ensure string value
				vriRoomNumber: appointment.vriRoomNumber || null, // Ensure number or null
				vri: appointment.vri || false, // Ensure boolean value
				vriLabel: appointment.vriLabel || false, // Ensure boolean value
				vriType: appointment.vriType || false, // Ensure boolean value
				createdbyLLS: appointment.createdbyLLS || false, // Ensure boolean value
			})) || []
		);
	}, [data]);

	const counts = useMemo(() => {
		return {
			all: formattedData.length,
			linkProvided: formattedData.filter(
				(appointment) =>
					appointment.createdbyLLS || appointment.videoLink.includes("http"),
			).length,
			attention: formattedData.filter(
				(appointment) =>
					!appointment.vri || !appointment.vriLabel || !appointment.vriType,
			).length,
			custPending: formattedData.filter((appointment) =>
				appointment.videoLink.toLowerCase().includes("will"),
			).length,
			demoPending: formattedData.filter(
				(appointment) =>
					appointment.videoLink.toLowerCase().includes("demo") &&
					!appointment.zoomJoinLink,
			).length,
		};
	}, [formattedData]);

	// Notify parent component of the counts
	useEffect(() => {
		onCountsChange(counts);
	}, [counts, onCountsChange]);

	const filteredData = useMemo(() => {
		return formattedData.filter((appointment) => {
			if (filter === "all") return true;
			if (filter === "linkProvided")
				return (
					appointment.createdbyLLS || appointment.videoLink.includes("http")
				);
			if (filter === "attention")
				return (
					!appointment.vri || !appointment.vriLabel || !appointment.vriType
				);
			if (filter === "custPending")
				return appointment.videoLink.toLowerCase().includes("will");
			if (filter === "demoPending")
				return (
					!appointment.zoomJoinLink &&
					appointment.videoLink.toLowerCase().includes("demo")
				);
			return true;
		});
	}, [formattedData, filter]);

	// Render loading state
	if (isLoading) {
		console.log("Loading data...");
		return <DataTableSkeleton rows={5} columns={5} />; // Display the DataTableSkeleton component
	}

	// Render error state
	if (error) {
		console.log("Error loading data:", error.message);
		return <div>Error: {error.message}</div>;
	}

	// Log raw data
	console.log("Raw data:", data);

	// Log formatted data
	console.log("Formatted data:", formattedData);

	// Log filtered data
	console.log("Filtered data:", filteredData);

	return (
		<DataTable
			columns={columns}
			data={filteredData}
			filter={filter}
			onFilterChange={onFilterChange}
			counts={counts}
		/>
	);
};

export default AppointmentsData;
