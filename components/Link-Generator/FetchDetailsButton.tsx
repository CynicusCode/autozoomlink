// FetchDetailsButton.tsx

"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchJobDetails } from "./JobDetailsApi";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Use the plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface FetchDetailsButtonProps {
	jobNumber: string;
}

const FetchDetailsButton: React.FC<FetchDetailsButtonProps> = ({
	jobNumber,
}) => {
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const { setValue } = useFormContext();

	const handleFetchDetails = async () => {
		setError(""); // Clear previous errors

		// Check if the jobNumber is exactly 5 digits and numeric
		if (!/^\d{5}$/.test(jobNumber)) {
			setError("Job number must be exactly 5 digits and numeric.");
			return;
		}

		setLoading(true);

		try {
			const data = await fetchJobDetails(jobNumber);

			// Set form values from fetched data
			setValue("manualTitle", `Job #${data.jobNumber}`); // Set the manualTitle using the jobNumber
			setValue("language", data.language);
			setValue("timeZone", data.timeZone);
			setValue("hours", String(Math.floor(data.expectedDurationHrs)));
			setValue(
				"minutes",
				String(data.expectedDurationMins % 60).padStart(2, "0"),
			);

			const formattedStartDate = dayjs(data.expectedStartDate)
				.utc()
				.tz("America/Denver")
				.format("MM/DD/YYYY hh:mm A");

			setValue("expectedStartDate", formattedStartDate); // Update the form with formatted date

			setLoading(false);
		} catch (err) {
			console.error("Failed to fetch details:", err);
			setError("Failed to fetch details. Please try again.");
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center">
			<Button
				onClick={handleFetchDetails}
				className={`
                    text-white 
                    bg-orange-600 hover:bg-orange-700 
                    dark:bg-green-600 dark:hover:bg-green-700
                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
				disabled={loading}
			>
				{loading ? "Loading..." : "Fetch Details"}
			</Button>
			{error && (
				<Alert className="mt-2 border-red-500">
					<AlertTitle className="text-lg text-red-600 dark:text-orange-500">
						Error
					</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
		</div>
	);
};

export default FetchDetailsButton;
