import type React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { handleSubmit as handleZoomSubmit } from "../utils/handleSubmit";
import { DateTimeHandler } from "../Date-time/dateUtils";

const GenerateZoomLink: React.FC = () => {
	const { handleSubmit, getValues, setValue, setError } = useFormContext();

	const handleClick = async () => {
		const currentValues = getValues();

		const { uiExpectedStartDate, timeZone } = currentValues;

		if (uiExpectedStartDate) {
			const utcDate = DateTimeHandler.convertToUtc(
				uiExpectedStartDate,
				timeZone,
			);
			setValue("expectedStartDate", utcDate);
			currentValues.expectedStartDate = utcDate;
		}

		if (!currentValues.manualTitle) {
			setError("manualTitle", { message: "Manual title is required" });
			console.error("Manual title is missing");
			return;
		}

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
