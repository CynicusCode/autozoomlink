import React from "react";
import { FloatingLabelInput } from "../ui/floatinginput";

const ManualTitle = () => {
	return (
		<div>
			<FloatingLabelInput
				label="Title" // This label will float on focus
				placeholderLabel="Link's Title" // Initial placeholder
			/>
		</div>
	);
};

export default ManualTitle;
