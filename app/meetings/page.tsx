// app/meetings/page.tsx
"use client";

import React, { useState, useCallback } from "react";
import MobileNav from "../components/shared/MobileNav";
import { Navbar } from "../components/shared/Navbar";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import AppointmentsData from "./AppointmentsData";

export default function MeetingsPage() {
	const [filter, setFilter] = useState<string>("all");
	const [counts, setCounts] = useState<Record<string, number>>({
		all: 0,
		linkProvided: 0,
		attention: 0,
		custPending: 0,
		demoPending: 0,
	});

	const handleTabChange = (value: string) => {
		console.log("Filter state updated to:", value);
		setFilter(value);
	};

	const handleCountsChange = useCallback(
		(newCounts: Record<string, number>) => {
			setCounts(newCounts);
		},
		[],
	);

	return (
		<div>
			<header>
				<Navbar />
				<MobileNav />
				<ThemeToggle />
			</header>
			<main>
				<div className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8">
					<h1 className="text-2xl font-bold mb-4 text-center">Meetings</h1>
					<AppointmentsData
						filter={filter}
						onCountsChange={handleCountsChange}
						onFilterChange={handleTabChange}
					/>
				</div>
			</main>
		</div>
	);
}
