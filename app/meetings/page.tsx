// app/meetings/page.tsx
"use client";

import React, { useState } from "react";
import MobileNav from "../components/shared/MobileNav";
import { Navbar } from "../components/shared/Navbar";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import AppointmentsData from "./AppointmentsData";
import MeetingTabs from "./MeetingTabs";

export default function MeetingsPage() {
	const [filter, setFilter] = useState<string>("all");

	const handleTabChange = (value: string) => {
		console.log("Filter state updated to:", value);
		setFilter(value);
	};

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
					<MeetingTabs activeTab={filter} onTabChange={handleTabChange} />
					<AppointmentsData filter={filter} />
				</div>
			</main>
		</div>
	);
}
