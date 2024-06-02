// app/components/Meetings/MeetingsDataFetcher.tsx

import type { GetServerSideProps } from "next";
import React from "react";
import { createClient } from "@supabase/supabase-js";
import { columns } from "@/components/Meetings/columns";
import { DataTable } from "@/components/Meetings/data-table";
import type { ColumnDef } from "@tanstack/react-table";

const supabase = createClient(
	"https://your-supabase-url.supabase.co",
	"public-anon-key",
);

export const getServerSideProps: GetServerSideProps = async () => {
	const { data, error } = await supabase
		.from("Appointment")
		.select(
			"id, manualTitle, date, durationHrs, durationMins, timeZone, vriApproved, videoLink",
		)
		.order("createdAt", { ascending: false });

	if (error) {
		console.error("Error fetching data:", error);
		return {
			props: {
				appointments: [],
			},
		};
	}

	const formattedData = data.map((appointment) => ({
		id: appointment.id,
		manualTitle: appointment.manualTitle,
		date: new Date(appointment.date).toLocaleString(),
		duration: `${appointment.durationHrs}h ${appointment.durationMins}m`,
		timeZone: appointment.timeZone,
		vri: appointment.vriApproved,
		videoLink: appointment.videoLink,
	}));

	return {
		props: {
			appointments: formattedData,
		},
	};
};

const MeetingsDataFetcher = ({
	appointments,
}: { appointments: Array<object> }) => {
	const formattedColumns = columns as ColumnDef<object, unknown>[];
	return <DataTable columns={formattedColumns} data={appointments} />;
};

export default MeetingsDataFetcher;
