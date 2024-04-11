//JobNumberInput.tsx
import type * as React from "react";
import { FloatingLabelInput } from "../ui/floatinginput";
import type { UseFormRegister } from "react-hook-form";

interface FormValues {
	jobNumber: string;
}

interface JobNumberInputProps {
	register: UseFormRegister<FormValues>;
}

const JobNumberInput: React.FC<JobNumberInputProps> = ({ register }) => {
	return (
		<div>
			<FloatingLabelInput
				id="jobNumber"
				label="Job Number"
				placeholderLabel="Enter a 5-digit job number"
				{...register("jobNumber")}
			/>
		</div>
	);
};

export default JobNumberInput;
