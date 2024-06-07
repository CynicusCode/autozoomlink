import type { ReactNode } from "react";
import type { Metadata } from "next";
import { poppins } from "./font";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import QueryProvider from "@/app/components/QueryProvider"; // Adjust the import path according to your project structure

// Metadata configuration for the entire application
export const metadata: Metadata = {
	title: "AZLG",
	title: "AZLG",
	description: "Auto Zoom Link Generator",
};

// Type definition for the properties expected by the RootLayout component
interface RootLayoutProps {
	children: ReactNode; // Accepts any valid React node
}

/**
 * RootLayout defines the structure of the main HTML document for the Next.js application.
 * It includes setting the global CSS, font, and managing themes using the ThemeProvider.
 *
 *
 * Props:
 * - children: React.ReactNode - The child components that will be rendered inside the ThemeProvider.
 *
 * Returns:
 * - A React component that provides a wrapped structure for the application's UI.
 */
export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={poppins.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<QueryProvider>{children}</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
