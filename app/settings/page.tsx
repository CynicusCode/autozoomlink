"use client";

import Link from "next/link";
import MobileNav from "../components/shared/MobileNav";
import { Navbar } from "../components/shared/Navbar";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
	FiBell,
	FiAlertCircle,
	FiBarChart2,
	FiSettings,
	FiUsers,
	FiHeart,
	FiActivity,
	FiDollarSign,
} from "react-icons/fi";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

const Settings = () => {
	return (
		<div>
			<header>
				<Navbar />
				<MobileNav />
				<ThemeToggle />
			</header>
			<main className="container mx-auto px-4 sm:px-12">
				<div className="flex flex-col bg-background text-foreground">
					<div className="overflow-auto">
						<nav className="grid gap-2 py-6 mt-24">
							<Link
								href="#"
								className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
								prefetch={false}
							>
								<FiBell className="h-5 w-5" />
								Notifications
							</Link>
							<Link
								href="#"
								className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
								prefetch={false}
							>
								<FiAlertCircle className="h-5 w-5" />
								Alerts
							</Link>
							<Link
								href="#"
								className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
								prefetch={false}
							>
								<FiBarChart2 className="h-5 w-5" />
								Reports
							</Link>
							<Link
								href="#"
								className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
								prefetch={false}
							>
								<FiSettings className="h-5 w-5" />
								Settings
							</Link>
							<Link
								href="#"
								className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
								prefetch={false}
							>
								<FiUsers className="h-5 w-5" />
								Users
							</Link>
						</nav>
						<main className="flex-1 overflow-auto p-6">
							<Card className="bg-card text-card-foreground">
								<CardHeader>
									<CardTitle>Notifications</CardTitle>
									<CardDescription>
										You have 3 unread notifications.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
										<span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
										<div className="grid gap-1">
											<p className="text-sm font-medium">
												User#1 created a link.
											</p>
											<p className="text-sm text-muted-foreground">5 min ago</p>
										</div>
									</div>
									<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
										<span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
										<div className="grid gap-1">
											<p className="text-sm font-medium">
												User#2 updated link 10510!
											</p>
											<p className="text-sm text-muted-foreground">1 min ago</p>
										</div>
									</div>
									<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
										<span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
										<div className="grid gap-1">
											<p className="text-sm font-medium">
												Your subscription is expiring soon!
											</p>
											<p className="text-sm text-muted-foreground">
												2 hours ago
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</main>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Settings;
