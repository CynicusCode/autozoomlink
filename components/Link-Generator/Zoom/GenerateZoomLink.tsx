// GenerateZoomLink.tsx
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface GenerateZoomLinkProps {
	onClick: () => void; // Expect an onClick function as a prop
}

const GenerateZoomLink: React.FC<GenerateZoomLinkProps> = ({ onClick }) => {
	const formContext = useFormContext(); // Access all form context data

	const handleClick = () => {
		formContext.handleSubmit(onClick)(); // Call handleSubmit with the provided onClick function
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
