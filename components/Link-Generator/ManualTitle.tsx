import type * as React from "react";
import { FloatingLabelInput } from "../ui/floatinginput";
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "./formSchema";

interface ManualTitleProps {
	register: UseFormRegister<FormValues>;
	disabled: boolean;
}

const ManualTitle: React.FC<ManualTitleProps> = ({ register, disabled }) => {
	return (
		<div>
			<FloatingLabelInput
				id="manualTitle"
				label="Title"
				placeholder="Link's Title"
				{...register("manualTitle")}
				disabled={disabled}
			/>
		</div>
	);
};

export default ManualTitle;
