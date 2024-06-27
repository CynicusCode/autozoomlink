// app/settings/page.tsx
"use client";

import MobileNav from "../components/shared/MobileNav";
import { Navbar } from "../components/shared/Navbar";
import { ThemeToggle } from "../components/shared/ThemeToggle";

const Settings = () => {
	return (
		<div>
			<header>
				<Navbar />
				<MobileNav />
				<ThemeToggle />
			</header>
		</div>
	);
};

export default Settings;
