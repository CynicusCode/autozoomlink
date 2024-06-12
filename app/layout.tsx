import type { ReactNode } from "react";
import type { Metadata } from "next";
import { poppins } from "./font";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import QueryProvider from "@/app/components/QueryProvider"; // Adjust the import path

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
