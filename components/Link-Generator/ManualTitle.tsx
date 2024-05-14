// ManualTitle.tsx
import type React from "react";
import { useFormContext } from "react-hook-form"; // Import useFormContext
import { FloatingLabelInput } from "../ui/floatinginput";
import type { FormValues } from "./formSchema";

interface ManualTitleProps {
	disabled: boolean;
}

const ManualTitle: React.FC<ManualTitleProps> = ({ disabled }) => {
	const { register, watch, setValue } = useFormContext<FormValues>(); // Use useFormContext to get register, watch, and setValue methods
	const manualTitle = watch("manualTitle"); // Watch the manualTitle field for changes

	return (
		<div>
			<FloatingLabelInput
				id="manualTitle"
				label="Meeting Title"
				placeholder="Meeting Title"
				value={manualTitle || ""} // Use the watched manualTitle value
				{...register("manualTitle")} // Use register directly from useFormContext
				disabled={disabled}
			/>
		</div>
	);
};

export default ManualTitle;
