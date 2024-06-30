/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DRvlolVpbTL
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FiMoreVertical } from "react-icons/fi";

export default function Component() {
	return (
		<div className="grid min-h-screen w-full grid-cols-[260px_1fr] overflow-hidden">
			<div className="flex flex-col bg-background text-foreground">
				<div className="flex h-20 items-center justify-between px-6">
					<Link
						href="#"
						className="flex items-center gap-2 font-semibold"
						prefetch={false}
					>
						<Package2Icon className="h-6 w-6" />
						<span className="sr-only">Admin Dashboard</span>
					</Link>
					<Button variant="ghost" size="icon" className="lg:hidden">
						<MenuIcon className="h-6 w-6" />
						<span className="sr-only">Toggle navigation</span>
					</Button>
				</div>
				<div className="flex-1 overflow-auto">
					<nav className="grid gap-2 px-4 py-6">
						<Link
							href="#"
							className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
							prefetch={false}
						>
							<BellIcon className="h-5 w-5" />
							Notifications
						</Link>
						<Link
							href="#"
							className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
							prefetch={false}
						>
							<CircleAlertIcon className="h-5 w-5" />
							Alerts
						</Link>
						<Link
							href="#"
							className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
							prefetch={false}
						>
							<BarChartIcon className="h-5 w-5" />
							Reports
						</Link>
						<Link
							href="#"
							className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
							prefetch={false}
						>
							<SettingsIcon className="h-5 w-5" />
							Settings
						</Link>
						<Link
							href="#"
							className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
							prefetch={false}
						>
							<UsersIcon className="h-5 w-5" />
							Users
						</Link>
					</nav>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-16 items-center justify-between border-b bg-background px-6">
					<div className="flex items-center gap-4">
						<Button variant="ghost" size="icon" className="lg:hidden">
							<MenuIcon className="h-6 w-6" />
							<span className="sr-only">Toggle navigation</span>
						</Button>
						<h1 className="text-lg font-semibold">Admin Dashboard</h1>
					</div>
					<div className="flex items-center gap-4">
						<div className="relative">
							<SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search..."
								className="pl-8 pr-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
							/>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-full">
									<img
										src="/placeholder.svg"
										width="32"
										height="32"
										className="rounded-full"
										alt="Avatar"
									/>
									<span className="sr-only">Toggle user menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem>Support</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				<main className="flex-1 overflow-auto p-6">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
											Your call has been confirmed.
										</p>
										<p className="text-sm text-muted-foreground">5 min ago</p>
									</div>
								</div>
								<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
									<span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
									<div className="grid gap-1">
										<p className="text-sm font-medium">
											You have a new message!
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
										<p className="text-sm text-muted-foreground">2 hours ago</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className="bg-card text-card-foreground">
							<CardHeader>
								<CardTitle>Alerts</CardTitle>
								<CardDescription>You have 2 active alerts.</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
									<span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-red-500" />
									<div className="grid gap-1">
										<p className="text-sm font-medium">Server Overload</p>
										<p className="text-sm text-muted-foreground">
											Your server is experiencing high traffic and may be
											slowing down.
										</p>
									</div>
								</div>
								<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
									<span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-yellow-500" />
									<div className="grid gap-1">
										<p className="text-sm font-medium">Disk Space Low</p>
										<p className="text-sm text-muted-foreground">
											Your server is running low on disk space, please free up
											some space.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className="bg-card text-card-foreground">
							<CardHeader>
								<CardTitle>Reports</CardTitle>
								<CardDescription>View your latest reports.</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-medium">
												Monthly Sales Report
											</p>
											<p className="text-sm text-muted-foreground">
												Last updated 2 days ago
											</p>
										</div>
										<Button variant="ghost" size="icon">
											<DownloadIcon className="h-5 w-5" />
											<span className="sr-only">Download</span>
										</Button>
									</div>
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-medium">
												User Activity Report
											</p>
											<p className="text-sm text-muted-foreground">
												Last updated 1 week ago
											</p>
										</div>
										<Button variant="ghost" size="icon">
											<DownloadIcon className="h-5 w-5" />
											<span className="sr-only">Download</span>
										</Button>
									</div>
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-medium">
												Marketing Campaign Report
											</p>
											<p className="text-sm text-muted-foreground">
												Last updated 3 days ago
											</p>
										</div>
										<Button variant="ghost" size="icon">
											<DownloadIcon className="h-5 w-5" />
											<span className="sr-only">Download</span>
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className="bg-card text-card-foreground">
							<CardHeader>
								<CardTitle>Settings</CardTitle>
								<CardDescription>Manage your account settings.</CardDescription>
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
											<SettingsIcon className="h-5 w-5" />
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
											<LockIcon className="h-5 w-5" />
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
											<PlugIcon className="h-5 w-5" />
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
													<BsThreeDotsVertical className="h-5 w-5" />
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
												<p className="text-sm text-muted-foreground">Editor</p>
											</div>
										</div>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<BsThreeDotsVertical className="h-5 w-5" />
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
												<p className="text-sm text-muted-foreground">Viewer</p>
											</div>
										</div>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<BsThreeDotsVertical className="h-5 w-5" />
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
	);
}

function BarChartIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="12" x2="12" y1="20" y2="10" />
			<line x1="18" x2="18" y1="20" y2="4" />
			<line x1="6" x2="6" y1="20" y2="16" />
		</svg>
	);
}

function BellIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
			<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
		</svg>
	);
}

function CircleAlertIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<line x1="12" x2="12" y1="8" y2="12" />
			<line x1="12" x2="12.01" y1="16" y2="16" />
		</svg>
	);
}

function DownloadIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="7 10 12 15 17 10" />
			<line x1="12" x2="12" y1="15" y2="3" />
		</svg>
	);
}

function LockIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
			<path d="M7 11V7a5 5 0 0 1 10 0v4" />
		</svg>
	);
}

function MenuIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="4" x2="20" y1="12" y2="12" />
			<line x1="4" x2="20" y1="6" y2="6" />
			<line x1="4" x2="20" y1="18" y2="18" />
		</svg>
	);
}

function MoveVerticalIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="8 18 12 22 16 18" />
			<polyline points="8 6 12 2 16 6" />
			<line x1="12" x2="12" y1="2" y2="22" />
		</svg>
	);
}

function Package2Icon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
			<path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
			<path d="M12 3v6" />
		</svg>
	);
}

function PlugIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M12 22v-5" />
			<path d="M9 8V2" />
			<path d="M15 8V2" />
			<path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
		</svg>
	);
}

function SearchIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

function SettingsIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	);
}

function UsersIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
			<path d="M16 3.13a4 4 0 0 1 0 7.75" />
		</svg>
	);
}
