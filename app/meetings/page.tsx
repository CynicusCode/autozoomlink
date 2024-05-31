"use client";
import MobileNav from "@/components/shared/MobileNav";
import { Navbar } from "@/components/shared/Navbar";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import React from "react";

const MeetingsPage = () => {
	return (
		<div>
			<header>
				<Navbar />
				<MobileNav />
				<ThemeToggle />
			</header>
			<main className="flex justify-center pt-24 ">
				<p>Here is the content of your meetings page.</p>
			</main>
		</div>
	);
};

export default MeetingsPage;
