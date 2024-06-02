// app/meetings/page.tsx
"use client";

import React from "react";
import MeetingTabs from "@/components/Meetings/MeetingTabs";
import MobileNav from "@/components/shared/MobileNav";
import { Navbar } from "@/components/shared/Navbar";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { DataTable } from "@/components/Meetings/data-table";
import { columns } from "@/components/Meetings/columns";

async function fetchAppointments() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAppointments`,
	);
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	const appointments = await res.json();
	return appointments;
}

export default async function MeetingsPage() {
	const appointments = await fetchAppointments();

	return (
		<div>
			<header>
				<Navbar />
				<MobileNav />
				<ThemeToggle />
			</header>
			<main className="flex flex-col items-center pt-20">
				<MeetingTabs />
				<DataTable columns={columns} data={appointments} />
			</main>
		</div>
	);
}
