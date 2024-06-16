// app/meetings/page.tsx
"use client";

import React from "react";
import MobileNav from "../components/shared/MobileNav";
import { Navbar } from "../components/shared/Navbar";
import { columns, type Meeting } from "./columns";
import { DataTable } from "./data-table";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import AppointmentsData from "./AppointmentsData";

export default function MeetingsPage() {
	return (
		<div>
			<header>
				<Navbar />
				<MobileNav />
				<ThemeToggle />
			</header>
			<main>
				<div className="container mx-auto mt-20">
					<h1 className="text-2xl font-bold mb-4 text-center">Meetings</h1>
					<AppointmentsData />
				</div>
			</main>
		</div>
	);
}
