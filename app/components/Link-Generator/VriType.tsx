"use client";
import { Badge } from "../../../components/ui/badge";
import { useFormContext } from "react-hook-form";
import type React from "react";

const VriType: React.FC = () => {
	const { watch } = useFormContext();
	const isVriType = watch("isVriType");

	if (isVriType === undefined) {
		return null;
	}

	return (
		<Badge
			className={`
        ${isVriType ? "bg-green-500" : "bg-red-500"}
        text-white
      `}
		>
			VRI in Service Type
		</Badge>
	);
};

export default VriType;
