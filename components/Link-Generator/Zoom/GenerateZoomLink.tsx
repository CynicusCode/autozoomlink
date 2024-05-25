import type React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { convertToUtc } from "../Date-time/dateUtils";
import { handleSubmit as handleZoomSubmit } from "../utils/handleSubmit";

const GenerateZoomLink: React.FC = () => {
	const { handleSubmit, getValues, setValue, setError } = useFormContext();

	const handleClick = async () => {
		const currentValues = getValues(); // Get all current form values

		const timeZone = currentValues.timeZone || "UTC";
		const expectedStartDate = currentValues.expectedStartDate;
		if (expectedStartDate) {
			const utcDate = convertToUtc(expectedStartDate, timeZone);
			setValue("expectedStartDate", utcDate); // Update the form value with the UTC date
			currentValues.expectedStartDate = utcDate;
		}
		// Call the Zoom API using handleZoomSubmit function
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
