// VriApproved.tsx
"use client";
import { Badge } from "../ui/badge";
import { useFormContext } from "react-hook-form";

const VriApproved: React.FC = () => {
	const { watch } = useFormContext();
	const isVriApproved = watch("isVriApproved");

	if (isVriApproved === undefined) {
		return null;
	}

	return (
		<Badge
			className={`
        ${isVriApproved ? "bg-green-500" : "bg-red-500"}
        text-white
      `}
		>
			VRI Approved Filter
		</Badge>
	);
};

export default VriApproved;
