import type { Metadata } from "next";
import { poppins } from "./font";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Metadata configuration for the entire application
export const metadata: Metadata = {
	title: "AZLG",
	description: "Auto Zoom Link Generator",
};

// Type definition for the properties expected by the RootLayout component
interface RootLayoutProps {
	children: React.ReactNode; // Accepts any valid React node
}

/**
 * RootLayout defines the structure of the main HTML document for the Next.js application.
 * It includes setting the global CSS, font, and managing themes using the ThemeProvider.
 *
 * Props:
 * - children: React.ReactNode - The child components that will be rendered inside the ThemeProvider.
 *
 * Returns:
 * - A React component that provides a wrapped structure for the application's UI.
 */
export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<head />
				<body className={poppins.className}>
					<QueryClientProvider client={queryClient}>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							{children}
							{process.env.NODE_ENV === "development" && (
								<ReactQueryDevtools initialIsOpen={false} />
							)}
						</ThemeProvider>
					</QueryClientProvider>
				</body>
			</html>
		</>
	);
}
