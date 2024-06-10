// JobNumberInput.tsx
import type React from "react";
import { FloatingLabelInput } from "../../../components/ui/floatinginput";

interface JobNumberInputProps {
	jobNumber: string;
	setJobNumber: (jobNumber: string) => void;
	setIsAutomaticMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobNumberInput: React.FC<JobNumberInputProps> = ({
	jobNumber,
	setJobNumber,
	setIsAutomaticMode,
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setJobNumber(e.target.value);
		setIsAutomaticMode(true); // Switch to automatic mode when user starts typing
	};

	return (
		<div>
			<FloatingLabelInput
				id="jobNumber"
				label="Job Number"
				placeholder="Enter a job number"
				value={jobNumber}
				onChange={handleInputChange}
				aria-label="Job Number"
			/>
		</div>
	);
};

export default JobNumberInput;
