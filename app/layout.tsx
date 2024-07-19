import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { poppins } from "./font";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import QueryProvider from "@/app/components/QueryProvider"; // Adjust the import path
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
	title: "AZLG",
	description: "Auto Zoom Link Generator",
};

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>AZLG</title>
			</head>
			<body className={poppins.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<QueryProvider>
						{children}
						<Analytics />
					</QueryProvider>
				</ThemeProvider>
				<SpeedInsights />
			</body>
		</html>
	);
}
