"use client";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../../ui/button";
import { handleSubmit as handleZoomSubmit } from "../utils/handleSubmit";
import { DateTimeHandler } from "../Date-time/dateUtils";

interface GenerateZoomLinkProps {
	onClick: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const GenerateZoomLink: React.FC<GenerateZoomLinkProps> = ({ onClick }) => {
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
				onClick={onClick} // Use the passed onClick prop
				style={{ backgroundColor: "#0B5CFF" }}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Generate Zoom Link
			</Button>
		</div>
	);
};

export default GenerateZoomLink;
