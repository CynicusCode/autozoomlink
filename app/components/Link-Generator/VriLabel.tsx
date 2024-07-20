"use client";
import { Badge } from "../../../components/ui/badge";
import { useFormContext } from "react-hook-form";
import type React from "react";

const VriLabel: React.FC = () => {
	const { watch } = useFormContext();
	const isVriLabel = watch("isVirtualLabelInAddress");

	if (isVriLabel === undefined) {
		return null;
	}

	return (
		<Badge
			className={`
        ${isVriLabel ? "bg-green-500" : "bg-red-500"}
        text-white
      `}
		>
			VRI in Address
		</Badge>
	);
};

export default VriLabel;
