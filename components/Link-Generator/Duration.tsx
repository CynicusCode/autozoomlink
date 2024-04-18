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
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "./types";

interface DurationProps {
	register: UseFormRegister<FormValues>;
}

export function Duration({ register }: DurationProps) {
	const hoursArray = Array.from({ length: 13 }, (_, i) => i.toString());
	const minutesArray = ["0", "15", "30", "45"];

	return (
		<div className="flex items-center space-x-4">
			<label htmlFor="duration" className="text-sm font-medium">
				Duration:
			</label>
			<Select {...register("hours", { required: true })}>
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
			<Select {...register("minutes", { required: true })}>
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
