import React from "react";
import { FloatingLabelInput } from "../ui/floatinginput";

const JobNumberInput = () => {
	return (
		<div>
			<FloatingLabelInput
				id="jobNumber"
				label="Job Number" // This label will float on focus
				placeholderLabel="Enter a 5-digit job number" // Initial placeholder
			/>
		</div>
	);
};

export default JobNumberInput;
