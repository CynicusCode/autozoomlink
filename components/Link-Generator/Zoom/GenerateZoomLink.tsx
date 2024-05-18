//GenerateZoomLink.tsx
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface GenerateZoomLinkProps {
	onClick: () => void; // Expect an onClick function as a prop
}

const GenerateZoomLink: React.FC<GenerateZoomLinkProps> = ({ onClick }) => {
	const { handleSubmit, getValues } = useFormContext();

	const handleClick = () => {
		const currentValues = getValues(); // Get all current form values
		console.log("Current form values:", currentValues); // Log current form values
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
