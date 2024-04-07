// MobileNav.tsx
import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const MobileNav = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="sm:hidden">
			<button
				className="text-foreground focus:outline-none"
				onClick={toggleMenu}
			>
				<svg
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					{isOpen ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					)}
				</svg>
			</button>
			{isOpen && (
				<div className="absolute top-16 right-0 w-full bg-background p-4">
					<ul className="space-y-4">
						<li>
							<Link href="/dashboard">
								<span className="hover:text-primary">Dashboard</span>
							</Link>
						</li>
						<li>
							<Link href="/meetings">
								<span className="hover:text-primary">Meetings</span>
							</Link>
						</li>
						<li>
							<Link href="/zoom-settings">
								<span className="hover:text-primary">Zoom Settings</span>
							</Link>
						</li>
						<li>
							<Link href="/ii-settings">
								<span className="hover:text-primary">II Settings</span>
							</Link>
						</li>
					</ul>
					<div className="mt-4">
						<ThemeToggle />
					</div>
				</div>
			)}
		</div>
	);
};

export default MobileNav;
