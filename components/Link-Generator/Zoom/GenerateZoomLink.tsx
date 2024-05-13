// GenerateZoomLink.tsx
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { FormValues } from "../formSchema";

interface GenerateZoomLinkProps {
	onSubmit: () => void; // Expect an onSubmit function as a prop
}

const GenerateZoomLink: React.FC<GenerateZoomLinkProps> = ({ onSubmit }) => {
	const formContext = useFormContext<FormValues>(); // Access all form context data

	// Function to log the form context data
	// const logFormData = () => {
	// 	console.log(formContext.getValues()); // Logs all form values
	// };

	return (
		<div className="space-x-2">
			<Button
				onClick={onSubmit}
				style={{ backgroundColor: "#0B5CFF" }}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Generate Zoom Link
			</Button>
			{/* <Button
				onClick={logFormData} // Button to log form data
				className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
			>
				Log Form Data
			</Button> */}
		</div>
	);
};

export default GenerateZoomLink;
