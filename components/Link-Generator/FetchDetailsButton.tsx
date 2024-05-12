// FetchDetailsButton.tsx

"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchJobDetails } from "./JobDetailsApi";
import { useFormContext } from "react-hook-form";
import { parseDateTime } from "@internationalized/date";

interface FetchDetailsButtonProps {
	jobNumber: string;
}

const FetchDetailsButton: React.FC<FetchDetailsButtonProps> = ({
	jobNumber,
}) => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
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

			setValue("manualTitle", data.jobNumber);
			setValue("language", data.language);
			setValue("timeZone", data.timeZone);

			// Here we extract the hours and minutes from the response
			const hours = Math.floor(data.expectedDurationMins / 60);
			const minutes = data.expectedDurationMins % 60;
			setValue("hours", hours.toString()); // Update form with hours
			setValue("minutes", minutes.toString()); // Update form with minutes

			// Parse the expectedStartDate from the API response
			const expectedStartDate = parseDateTime(data.expectedStartDate);
			setValue("expectedStartDate", expectedStartDate); // Update form with expectedStartDate

			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch details:", error);
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
					<AlertTitle className=" text-lg text-red-600 dark:text-orange-500">
						Error
					</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
		</div>
	);
};

export default FetchDetailsButton;
