"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import MobileNav from "./MobileNav";

export const Navbar = () => {
	return (
		<nav className="bg-background text-foreground flex justify-between fixed z-50 w-full sm:px-12 pt-8">
			<div className="container mx-auto flex items-center justify-evenly">
				<Link href="/">
					<span className="text-xl font-bold">Logo</span>
				</Link>
				<ul className="hidden sm:flex space-x-8">
					<li>
						<Link href="/">
							<span className="hover:text-primary">Home</span>
						</Link>
					</li>
					<li>
						<Link href="/meetings">
							<span className="hover:text-primary">Meetings</span>
						</Link>
					</li>
					<li>
						<Link href="/settings">
							<span className="hover:text-primary">Settings</span>
						</Link>
					</li>
				</ul>
				<div className="flex items-center space-x-4">
					<ThemeToggle />
					<span className="text-foreground">User Profile</span>
				</div>
			</div>
			<MobileNav />
		</nav>
	);
};
