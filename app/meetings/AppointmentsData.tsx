// app/meetings/AppointmentsData.tsx
"use client";

import type React from "react";
import {
	useEffect,
	useMemo,
	createContext,
	useContext,
	useState,
	ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import fetchAppointments from "@/lib/fetchAppointments";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DateTimeHandler } from "../components/Link-Generator/Date-time/dateUtils";

interface Meeting {
	id: string;
	jobNumber: string;
	manualTitle: string;
	date: string;
	durationHrs: number;
	durationMins: number;
	timeZone: string;
	timeZoneDisplayName: string;
	vriApproved: boolean;
	vriLabel: boolean;
	vriType: boolean;
	videoLink: string;
	requestorName: string;
	requestorEmail: string;
	createdByLLS: boolean;
	zoomJoinLink: string;
	vriRoomNumber: number | null;
	createdAt: string;
	requiresAttention: boolean;
	status: string;
	vri: boolean;
	createdbyLLS: boolean;
}

interface AppointmentsContextType {
	appointments: Meeting[];
	setAppointments: React.Dispatch<React.SetStateAction<Meeting[]>>;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
	undefined,
);

export const useAppointments = (): AppointmentsContextType => {
	const context = useContext(AppointmentsContext);
	if (!context) {
		throw new Error(
			"useAppointments must be used within an AppointmentsProvider",
		);
	}
	return context;
};

interface AppointmentsDataProps {
	filter: string;
	onCountsChange: (counts: Record<string, number>) => void;
	onFilterChange: (filter: string) => void;
}

const AppointmentsData: React.FC<AppointmentsDataProps> = ({
	filter,
	onCountsChange,
	onFilterChange,
}) => {
	const { data, error, isLoading } = useQuery<Meeting[]>({
		queryKey: ["appointments"],
		queryFn: fetchAppointments,
	});

	const [appointments, setAppointments] = useState<Meeting[]>(data || []);

	const formattedData = useMemo(() => {
		return (
			appointments?.map((appointment) => ({
				...appointment,
				date: DateTimeHandler.formatDateTimeForDisplay(
					appointment.date,
					appointment.timeZone,
				),
			})) || []
		);
	}, [appointments]);

	const counts = useMemo(() => {
		return {
			all: formattedData.length,
			linkProvided: formattedData.filter(
				(appointment) =>
					appointment.createdByLLS || appointment.videoLink.includes("http"),
			).length,
			attention: formattedData.filter(
				(appointment) =>
					!appointment.vriApproved ||
					!appointment.vriLabel ||
					!appointment.vriType,
			).length,
			custPending: formattedData.filter((appointment) =>
				appointment.videoLink.toLowerCase().includes("customer"),
			).length,
			demoPending: formattedData.filter(
				(appointment) =>
					appointment.videoLink.toLowerCase().includes("demo") &&
					!appointment.zoomJoinLink,
			).length,
		};
	}, [formattedData]);

	useEffect(() => {
		onCountsChange(counts);
	}, [counts, onCountsChange]);

	const filteredData = useMemo(() => {
		return formattedData.filter((appointment) => {
			if (filter === "all") return true;
			if (filter === "linkProvided")
				return (
					appointment.createdByLLS || appointment.videoLink.includes("http")
				);
			if (filter === "attention")
				return (
					!appointment.vriApproved ||
					!appointment.vriLabel ||
					!appointment.vriType
				);
			if (filter === "custPending")
				return appointment.videoLink.toLowerCase().includes("customer");
			if (filter === "demoPending")
				return (
					!appointment.zoomJoinLink &&
					appointment.videoLink.toLowerCase().includes("demo")
				);
			return true;
		});
	}, [formattedData, filter]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<AppointmentsContext.Provider value={{ appointments, setAppointments }}>
			<DataTable
				columns={columns}
				data={filteredData}
				filter={filter}
				onFilterChange={onFilterChange}
				counts={counts}
			/>
		</AppointmentsContext.Provider>
	);
};

export default AppointmentsData;
