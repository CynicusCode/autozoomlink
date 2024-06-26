import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "../../../components/ui/button";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "../../../components/ui/alert";
import useJobDetails from "../../hooks/useJobDetails";
import { useFormContext } from "react-hook-form";
import { DateTimeHandler } from "./Date-time/dateUtils";

interface FetchDetailsButtonProps {
	jobNumber: string;
}

const FetchDetailsButton: React.FC<FetchDetailsButtonProps> = ({
	jobNumber,
}) => {
	const [shouldFetch, setShouldFetch] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const { setValue } = useFormContext();
	const {
		data,
		error: queryError,
		isLoading,
		refetch,
	} = useJobDetails(jobNumber, shouldFetch);

	const setFormattedStartDate = useCallback(
		(startDate: string, timeZone: string): string => {
			return DateTimeHandler.formatDateTimeForDisplay(startDate, timeZone);
		},
		[],
	);

	useEffect(() => {
		if (data) {
			// Set form values from fetched data
			setValue("jobNumber", data.jobNumber);
			setValue("manualTitle", `Job #${data.jobNumber}`);
			setValue("isJobNumberFetched", true);
			setValue("language", data.language);
			setValue("timeZone", data.timeZone);
			setValue("hours", String(Math.floor(data.expectedDurationHrs)));
			setValue(
				"minutes",
				String(data.expectedDurationMins % 60).padStart(2, "0"),
			);

			const formattedStartDate = setFormattedStartDate(
				data.expectedStartDate,
				data.timeZone,
			);
			setValue("expectedStartDate", data.expectedStartDate); // For server use
			setValue("uiExpectedStartDate", formattedStartDate); // For UI display

			setValue("isVriApproved", data.isVriApproved);
			setValue("isVirtualLabelInAddress", data.isVirtualLabelInAddress);
			setValue("isVriType", data.isVriType);
			setValue("requestorName", data.requestorName);
			setValue("requestorEmail", data.requestorEmail);
			setValue("jobStatus", data.jobStatus);
			setValue("videoLinkField", data.videoLinkField);

			// Reset fetch state
			setShouldFetch(false);
			setValue("timeZoneDisplayName", data.timeZoneDisplayName);
		}
	}, [data, setValue, setFormattedStartDate]);

	const handleFetchDetails = async () => {
		setError(""); // Clear previous errors

		// Ensure job number is exactly 5 digits
		if (!/^\d{5}$/.test(jobNumber)) {
			setError("Job number must be exactly 5 digits and numeric.");
			return;
		}

		// Trigger the fetch
		setShouldFetch(true);
		refetch();
	};

	return (
		<div className="flex flex-col items-center">
			<Button
				onClick={handleFetchDetails}
				className={`text-white bg-orange-600 hover:bg-orange-700 dark:bg-blue-600 dark:hover:bg-blue-900 ${
					isLoading ? "opacity-50 cursor-not-allowed" : ""
				}`}
				disabled={isLoading}
			>
				{isLoading ? "Loading..." : "Fetch Details"}
			</Button>
			{(error || queryError) && (
				<Alert className="mt-2 border-red-500">
					<AlertTitle className="text-lg text-red-600 dark:text-orange-500">
						Error
					</AlertTitle>
					<AlertDescription>
						{error || "Failed to fetch details. Please try again."}
					</AlertDescription>
				</Alert>
			)}
		</div>
	);
};

export default FetchDetailsButton;
