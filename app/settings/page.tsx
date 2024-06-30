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
	FiDownload,
	FiMoreVertical,
} from "react-icons/fi";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

const Settings = () => {
	return (
		<div className="flex flex-col min-h-screen bg-background text-foreground">
			<header className="flex h-20 items-center justify-between px-6 bg-background">
				<Navbar />
				<MobileNav />
				<ThemeToggle />
			</header>
			<div className="flex flex-1 pt-16 justify-center">
				<div className="flex flex-1 max-w-7xl">
					<nav className="flex flex-col bg-background text-foreground w-64 p-6">
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
					<main className="flex-1 overflow-auto max-w-7xl w-full">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							<Card className="bg-card text-card-foreground">
								<CardHeader>
									<div className="flex items-center space-x-2">
										<FiBell className="h-5 w-5" />
										<CardTitle>Notifications</CardTitle>
									</div>
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
							<Card className="bg-card text-card-foreground">
								<CardHeader>
									<div className="flex items-center space-x-2">
										<FiAlertCircle className="h-5 w-5" />
										<CardTitle>Alerts</CardTitle>
									</div>
									<CardDescription>You have 2 active alerts.</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
										<span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-red-500" />
										<div className="grid gap-1">
											<p className="text-sm font-medium">
												Meeting # 10102 doesn't have a link.
											</p>
											<p className="text-sm text-muted-foreground">
												A meeting started 5 minutes ago, link is missing! Wake
												up people!!
											</p>
										</div>
									</div>
									<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
										<span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-yellow-500" />
										<div className="grid gap-1">
											<p className="text-sm font-medium">
												Meeting # 10099 is missing link
											</p>
											<p className="text-sm text-muted-foreground">
												A meeting expected to start in 1 hour is missing a link.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card className="bg-card text-card-foreground">
								<CardHeader>
									<div className="flex items-center space-x-2">
										<FiBarChart2 className="h-5 w-5" />
										<CardTitle>Reports</CardTitle>
									</div>
									<CardDescription>View your latest reports.</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm font-medium">
													Monthly report with Ai analysis
												</p>
												<p className="text-sm text-muted-foreground">
													Last updated 2 days ago
												</p>
											</div>
											<Button variant="ghost" size="icon">
												<FiDownload className="h-5 w-5" />
												<span className="sr-only">Download</span>
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm font-medium">
													Daily report of pending links
												</p>
												<p className="text-sm text-muted-foreground">
													Last updated 1 week ago
												</p>
											</div>
											<Button variant="ghost" size="icon">
												<FiDownload className="h-5 w-5" />
												<span className="sr-only">Download</span>
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm font-medium">
													Manual report of languges use
												</p>
												<p className="text-sm text-muted-foreground">
													Last updated 3 days ago
												</p>
											</div>
											<Button variant="ghost" size="icon">
												<FiDownload className="h-5 w-5" />
												<span className="sr-only">Download</span>
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mt-6 justify-center">
							<Card className="bg-card text-card-foreground">
								<CardHeader>
									<div className="flex items-center space-x-2">
										<FiSettings className="h-5 w-5" />
										<CardTitle>Settings</CardTitle>
									</div>
									<CardDescription>
										Manage your account settings.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm font-medium">General</p>
												<p className="text-sm text-muted-foreground">
													Update your basic account information
												</p>
											</div>
											<Button variant="ghost" size="icon">
												<FiSettings className="h-5 w-5" />
												<span className="sr-only">Settings</span>
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm font-medium">Security</p>
												<p className="text-sm text-muted-foreground">
													Manage your account security settings
												</p>
											</div>
											<Button variant="ghost" size="icon">
												<FiUsers className="h-5 w-5" />
												<span className="sr-only">Security</span>
											</Button>
										</div>
										<div className="flex items-center justify-between">
											<div>
												<p className="text-sm font-medium">Integrations</p>
												<p className="text-sm text-muted-foreground">
													Connect your account to external services
												</p>
											</div>
											<Button variant="ghost" size="icon">
												<FiDownload className="h-5 w-5" />
												<span className="sr-only">Integrations</span>
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-card text-card-foreground">
								<CardHeader>
									<CardTitle>Users</CardTitle>
									<CardDescription>Manage your team members.</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid gap-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<Avatar className="h-10 w-10">
													<AvatarImage src="/placeholder-user.jpg" />
													<AvatarFallback>JD</AvatarFallback>
												</Avatar>
												<div>
													<p className="text-sm font-medium">John Doe</p>
													<p className="text-sm text-muted-foreground">Admin</p>
												</div>
											</div>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<FiMoreVertical className="h-5 w-5" />
														<span className="sr-only">More</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Deactivate</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<Avatar className="h-10 w-10">
													<AvatarImage src="/placeholder-user.jpg" />
													<AvatarFallback>JA</AvatarFallback>
												</Avatar>
												<div>
													<p className="text-sm font-medium">Jane Appleseed</p>
													<p className="text-sm text-muted-foreground">
														Editor
													</p>
												</div>
											</div>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<FiMoreVertical className="h-5 w-5" />
														<span className="sr-only">More</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Deactivate</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<Avatar className="h-10 w-10">
													<AvatarImage src="/placeholder-user.jpg" />
													<AvatarFallback>MS</AvatarFallback>
												</Avatar>
												<div>
													<p className="text-sm font-medium">Michael Smith</p>
													<p className="text-sm text-muted-foreground">
														Viewer
													</p>
												</div>
											</div>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<FiMoreVertical className="h-5 w-5" />
														<span className="sr-only">More</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>Edit</DropdownMenuItem>
													<DropdownMenuItem>Deactivate</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default Settings;
