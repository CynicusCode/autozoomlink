"use client";
import type React from "react";
import {
	DateTimePicker,
	type DateValue,
} from "@/components/ui/datetime-picker";
import { type Control, Controller } from "react-hook-form";
import type { FormValues } from "./types";
import { fromDate, getLocalTimeZone } from "@internationalized/date";

interface DatePickerProps {
	control: Control<FormValues>;
	name: keyof FormValues;
}

const DatePicker: React.FC<DatePickerProps> = ({ control, name }) => {
	return (
		<div className="flex items-center gap-3">
			<p className="whitespace-nowrap">Select Date & Time:</p>
			<Controller
				control={control}
				name={name}
				rules={{ required: "Date and time are required" }}
				render={({ field: { onChange, value } }) => {
					const dateValue =
						value instanceof Date ? fromDate(value, getLocalTimeZone()) : null;
					return (
						<DateTimePicker
							onChange={(selectedDate) => {
								onChange(
									selectedDate ? selectedDate.toDate(getLocalTimeZone()) : null,
								);
							}}
							value={dateValue}
						/>
					);
				}}
			/>
		</div>
	);
};

export default DatePicker;
