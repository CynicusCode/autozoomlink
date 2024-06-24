import type React from "react";
import { Button } from "../../../../components/ui/button";
import type { UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import type { FormValues } from "../formSchema";

interface SubmitButtonProps {
	handleSubmit: UseFormHandleSubmit<FormValues>;
	onSubmit: (data: FormValues) => void;
	errors: FieldErrors<FormValues>;
	isCreatingZoomMeeting: boolean;
	isCreatingAppointment: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
	handleSubmit,
	onSubmit,
	errors,
	isCreatingZoomMeeting,
	isCreatingAppointment,
}) => {
	return (
		<Button
			onClick={() => {
				console.log("Button clicked, calling handleSubmit");
				handleSubmit(onSubmit)();
				if (Object.keys(errors).length > 0) {
					console.error("Validation errors:", errors);
				}
			}}
			style={{ backgroundColor: "#0B5CFF" }}
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			disabled={isCreatingZoomMeeting || isCreatingAppointment}
		>
			{isCreatingZoomMeeting || isCreatingAppointment
				? "Loading..."
				: "Generate Zoom Link"}
		</Button>
	);
};
