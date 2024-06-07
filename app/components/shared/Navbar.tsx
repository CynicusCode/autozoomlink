/**
 * Structure:
 * - Logo: Clickable logo that redirects to the home page.
 * - Navigation Links: Visible on screens wider than the 'sm' breakpoint, includes links to Dashboard, Meetings, and Settings.
 * - ThemeToggle: Button to switch between light and dark themes.
 * - User Profile: Placeholder or indicator for user profile integration.
 * - MobileNav: Component that renders a mobile-friendly navigation menu.
 */
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