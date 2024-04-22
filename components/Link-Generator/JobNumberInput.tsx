import type * as React from "react";
import { FloatingLabelInput } from "../ui/floatinginput";

interface JobNumberInputProps {
	jobNumber: string;
	setJobNumber: (jobNumber: string) => void;
}

const JobNumberInput: React.FC<JobNumberInputProps> = ({
	jobNumber,
	setJobNumber,
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setJobNumber(e.target.value); // Update the job number as the user types
	};

	return (
		<div>
			<FloatingLabelInput
				id="jobNumber"
				label="Job Number"
				placeholder="Enter a 7-digit job number"
				value={jobNumber}
				onChange={handleInputChange}
			/>
		</div>
	);
};

export default JobNumberInput;
