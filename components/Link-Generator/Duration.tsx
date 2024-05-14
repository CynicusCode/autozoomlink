// Duration.tsx

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { FormValues } from "./formSchema"; // Ensure this path is correct

interface DurationProps {
	disabled: boolean;
}

export function Duration({ disabled }: DurationProps) {
	const { setValue, watch, register } = useFormContext<FormValues>();
	const hours = watch("hours");
	const minutes = watch("minutes");

	useEffect(() => {
		register("hours");
		register("minutes");
	}, [register]);

	const onHoursChange = (value: string) => {
		setValue("hours", value);
	};

	const onMinutesChange = (value: string) => {
		setValue("minutes", value);
	};

	const hoursArray = Array.from({ length: 24 }, (_, i) => i.toString()); // Assuming 24-hour format, adjust as needed
	const minutesArray = ["00", "15", "30", "45"];

	return (
		<div className="flex items-center space-x-4">
			<label htmlFor="hours" className="text-sm font-medium">
				Duration:
			</label>
			<Select onValueChange={onHoursChange} value={hours} disabled={disabled}>
				<SelectTrigger className="w-[120px]">
					<SelectValue placeholder="Hours" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Hours</SelectLabel>
						{hoursArray.map((hour) => (
							<SelectItem key={hour} value={hour}>
								{hour}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select
				onValueChange={onMinutesChange}
				value={minutes}
				disabled={disabled}
			>
				<SelectTrigger className="w-[120px]">
					<SelectValue placeholder="Minutes" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Minutes</SelectLabel>
						{minutesArray.map((minute) => (
							<SelectItem key={minute} value={minute}>
								{minute}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
