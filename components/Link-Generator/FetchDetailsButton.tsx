import type React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useJobDetails from "../../hooks/useJobDetails";
import { useFormContext } from "react-hook-form";
import { DateTimeHandler } from "./Date-time/dateUtils";

interface FetchDetailsButtonProps {
	jobNumber: string;
}

const FetchDetailsButton: React.FC<FetchDetailsButtonProps> = ({
	jobNumber,
}) => {
	const { setValue } = useFormContext();
	const { data, error, isLoading } = useJobDetails(jobNumber);
	const [localError, setLocalError] = useState<string>("");

	useEffect(() => {
		if (data) {
			// Set form values from fetched data
			setValue("jobNumber", data.jobNumber);
			setValue("manualTitle", `Job #${data.jobNumber}`);
			setValue("isJobNumberFetched", true); // Set the flag indicating the job number was fetched
			setValue("language", data.language);
			setValue("timeZone", data.timeZone);
			setValue("hours", String(Math.floor(data.expectedDurationHrs)));
			setValue(
				"minutes",
				String(data.expectedDurationMins % 60).padStart(2, "0"),
			);

			const formattedStartDate = DateTimeHandler.formatDateTimeForDisplay(
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
		}
	}, [data, setValue]);

	const handleFetchDetails = async () => {
		setLocalError(""); // Clear previous errors

		if (!/^\d{5}$/.test(jobNumber)) {
			setLocalError("Job number must be exactly 5 digits and numeric.");
		}
	};

	return (
		<div className="flex flex-col items-center">
			<Button
				onClick={handleFetchDetails}
				className={`text-white bg-orange-600 hover:bg-orange-700 dark:bg-green-600 dark:hover:bg-green-700 ${
					isLoading ? "opacity-50 cursor-not-allowed" : ""
				}`}
				disabled={isLoading}
			>
				{isLoading ? "Loading..." : "Fetch Details"}
			</Button>
			{(error || localError) && (
				<Alert className="mt-2 border-red-500">
					<AlertTitle className="text-lg text-red-600 dark:text-orange-500">
						Error
					</AlertTitle>
					<AlertDescription>{localError || error.message}</AlertDescription>
				</Alert>
			)}
		</div>
	);
};

export default FetchDetailsButton;
