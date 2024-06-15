// app/meetings/page.tsx
"use client";

import React from "react";
import MobileNav from "../components/shared/MobileNav";
import { Navbar } from "../components/shared/Navbar";
import { columns, type Meeting } from "./columns";
import { DataTable } from "./data-table";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import MeetingTabs from "./MeetingTabs";

const fakeData: Meeting[] = [
	{
		jobNumber: "20010",
		date: "06/11/24 12:00 PM",
		timeZone: "EDT",
		requiresAttention: "vriFilter missing",
		thirdPartyVideoLink: "Demo to generate link",
		status: "Pending",
		link: "Pending",
		vriRoom: "Demo 0",
	},
	{
		jobNumber: "20011",
		date: "06/11/24 09:00 PM",
		timeZone: "EDT",
		requiresAttention: "vriFilter missing",
		thirdPartyVideoLink: "Demo to generate link",
		status: "Pending",
		link: "Pending",
		vriRoom: "Demo 0",
	},
];

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
					<DataTable columns={columns} data={fakeData} />
				</div>
			</main>
		</div>
	);
}

// // app/meetings/page.tsx
// "use client";

// import React from "react";
// import MobileNav from "../components/shared/MobileNav";
// import { Navbar } from "../components/shared/Navbar";
// import { ThemeToggle } from "../components/shared/ThemeToggle";
// import AppointmentsPage from "./AppointmentsPage";

// const MeetingsPage = () => {
//   return (
//     <div>
//       <header>
//         <Navbar />
//         <MobileNav />
//         <ThemeToggle />
//       </header>
//       <main>
//         <div className="container mx-auto mt-20">
//           <AppointmentsPage />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MeetingsPage;
