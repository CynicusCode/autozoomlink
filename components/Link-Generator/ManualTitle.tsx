// ManualTitle.tsx
import type * as React from "react";
import { FloatingLabelInput } from "../ui/floatinginput";
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "./types";

interface ManualTitleProps {
	register: UseFormRegister<FormValues>;
}

const ManualTitle: React.FC<ManualTitleProps> = ({ register }) => {
	return (
		<div>
			<FloatingLabelInput
				id="manualTitle"
				label="Title"
				placeholder="Link's Title"
				{...register("manualTitle")}
			/>
		</div>
	);
};

export default ManualTitle;
