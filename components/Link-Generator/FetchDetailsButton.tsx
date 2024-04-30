// FetchDetailsButton.tsx
// API call was transfered to JobDetailsApi.tsx to keep the component focus
"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchJobDetails } from "./JobDetailsApi";
import { useFormContext } from "react-hook-form";

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

		// Check if the jobNumber is exactly 7 digits and numeric
		if (!/^\d{5}$/.test(jobNumber)) {
			setError("Job number must be exactly 7 digits and numeric.");
			return;
		}

		setLoading(true);

		try {
			const data = await fetchJobDetails(jobNumber);
			setValue("manualTitle", data.jobNumber);
			setValue("language", data.language);
			setValue("timeZone", data.timeZone);

			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch details:", error);
			setError("Failed to fetch details. Please try again.");
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center">
			<Button
				onClick={handleFetchDetails}
				className={`bg-orange-600 text-white hover:bg-orange-700 ${
					loading ? "opacity-50 cursor-not-allowed" : ""
				}`}
				disabled={loading}
			>
				{loading ? "Loading..." : "Fetch Details"}
			</Button>
			{error && <div style={{ color: "red" }}>{error}</div>}
		</div>
	);
};

export default FetchDetailsButton;
