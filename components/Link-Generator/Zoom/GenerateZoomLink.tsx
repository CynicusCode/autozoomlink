import type React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { handleSubmit as handleZoomSubmit } from "../utils/handleSubmit";
import { DateTimeHandler } from "../Date-time/dateUtils";

const GenerateZoomLink: React.FC = () => {
	// Get methods from the react-hook-form context
	const { handleSubmit, getValues, setValue, setError } = useFormContext();

	// Handle the click event when the "Generate Zoom Link" button is clicked
	const handleClick = async () => {
		// Get current form values
		const currentValues = getValues();
		console.log("Initial form values:", currentValues);

		// Destructure uiExpectedStartDate and timeZone from current form values
		const { uiExpectedStartDate, timeZone } = currentValues;

		// Convert uiExpectedStartDate to UTC format if it exists
		if (uiExpectedStartDate) {
			const utcDate = DateTimeHandler.convertToUtc(
				uiExpectedStartDate,
				timeZone,
			);
			// Update the expectedStartDate form value with the converted UTC date
			setValue("expectedStartDate", utcDate);
			currentValues.expectedStartDate = utcDate;
			console.log("Converted to UTC date:", utcDate);
		}

		// Ensure manualTitle is set correctly
		if (!currentValues.manualTitle) {
			// Set an error if manualTitle is missing
			setError("manualTitle", { message: "Manual title is required" });
			console.error("Manual title is missing");
			return;
		}

		// Call the Zoom API using the handleZoomSubmit function
		await handleZoomSubmit(currentValues, setValue, getValues, setError);
	};

	return (
		<div className="space-x-2">
			<Button
				onClick={handleClick}
				style={{ backgroundColor: "#0B5CFF" }}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Generate Zoom Link
			</Button>
		</div>
	);
};

export default GenerateZoomLink;
