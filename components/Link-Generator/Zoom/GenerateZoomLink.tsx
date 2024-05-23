// GenerateZoomLink.tsx
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { convertToUtc } from "../Date-time/dateUtils";

interface GenerateZoomLinkProps {
	onClick: () => void; // Expect an onClick function as a prop
}

const GenerateZoomLink: React.FC<GenerateZoomLinkProps> = ({ onClick }) => {
	const { handleSubmit, getValues, setValue } = useFormContext();

	const handleClick = () => {
		const currentValues = getValues(); // Get all current form values

		const timeZone = currentValues.timeZone || "UTC";
		const expectedStartDate = currentValues.expectedStartDate;
		if (expectedStartDate) {
			const utcDate = convertToUtc(expectedStartDate, timeZone);
			setValue("expectedStartDate", utcDate); // Update the form value with the UTC date
			currentValues.expectedStartDate = utcDate;
		}

		console.log("Current form values after conversion:", currentValues); // Log current form values after conversion
		handleSubmit(onClick)();
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
