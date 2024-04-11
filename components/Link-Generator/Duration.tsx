"use client";
import * as React from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function Duration() {
	const [hours, setHours] = React.useState("0");
	const [minutes, setMinutes] = React.useState("0");

	const hoursArray = Array.from({ length: 13 }, (_, i) => i.toString());
	const minutesArray = ["0", "15", "30", "45"];

	return (
		<div className="flex items-center space-x-4">
			<label htmlFor="duration" className="text-sm font-medium">
				Duration:
			</label>
			<Select value={hours} onValueChange={setHours}>
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
			<Select value={minutes} onValueChange={setMinutes}>
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
