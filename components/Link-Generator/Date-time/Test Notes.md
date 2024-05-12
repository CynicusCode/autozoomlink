# Test Notes

//DateTimePicker.tsx
import type React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { Input } from "@/components/ui/Input";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { CalendarPicker } from "./CalendarPicker";
import { TimePicker } from "./TimePicker";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { CalendarIcon } from "@radix-ui/react-icons";

interface DateTimeState {
	date: Date | null;
	hour: number;
	minute: number;
	ampm: string;
}

export const DateTimePicker = () => {
	const [dateTime, setDateTime] = useState<DateTimeState>({
		date: null,
		hour: 12,
		minute: 0,
		ampm: "AM",
	});

	const handleDateChange = (newDate: Date | undefined) => {
		if (newDate) {
			setDateTime((prev) => ({ ...prev, date: newDate }));
		}
	};

	const handleTimeChange = (hour: number, minute: number, ampm: string) => {
		setDateTime((prev) => ({ ...prev, hour, minute, ampm }));
	};

	const formatDateTime = () => {
		if (!dateTime.date) return "";
		const dayjsDate = dayjs(dateTime.date);
		const hour =
			dateTime.ampm === "PM" ? (dateTime.hour % 12) + 12 : dateTime.hour % 12;
		return dayjsDate
			.hour(hour)
			.minute(dateTime.minute)
			.format("MM/DD/YYYY hh:mm A");
	};

	return (
		<div className="relative w-full max-w-sm">
			<Popover>
				<PopoverTrigger asChild>
					<div className="w-full cursor-pointer flex items-center relative">
						<label htmlFor="timezone-select" className="whitespace-nowrap pr-2">
							Date & Time:
						</label>
						<InputWithIcon
							label=""
							id="dateTimeInput"
							icon={<CalendarIcon />}
							className="w-full pr-10 pl-10"
							placeholder="MM/DD/YYYY HH:MM AM/PM"
							type="text"
							value={formatDateTime()}
							readOnly
						/>
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<div className="rounded-lg shadow-lg p-8">
						<CalendarPicker onDateChange={handleDateChange} />
						<TimePicker onTimeChange={handleTimeChange} />
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DateTimePicker;


// CalendarPicker.tsx
import React from "react";
import { Calendar } from "@/components/ui/calendar";

interface CalendarPickerProps {
	onDateChange: (date: Date | undefined) => void;
}

export const CalendarPicker = ({ onDateChange }: CalendarPickerProps) => {
	return (
		<Calendar
			initialFocus
			mode="single"
			onSelect={onDateChange}
			className="mb-4"
		/>
	);
};

// TimePicker.tsx
import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
	onTimeChange: (hour: number, minute: number, ampm: string) => void;
}

export const TimePicker = ({ onTimeChange }: TimePickerProps) => {
	const handleHourChange = (newHour: string) => {
		onTimeChange(Number(newHour), 0, "AM"); // Defaulting minute and ampm for simplicity
	};

	const handleMinuteChange = (newMinute: string) => {
		onTimeChange(0, Number(newMinute), "AM"); // Defaulting hour and ampm for simplicity
	};

	const handleAmpmChange = (newAmpm: string) => {
		onTimeChange(0, 0, newAmpm); // Defaulting hour and minute for simplicity
	};

	return (
		<div className="flex gap-2 justify-center">
			<Select defaultValue="12" onValueChange={handleHourChange}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{Array.from({ length: 12 }, (_, index) => index + 1).map((hour) => (
						<SelectItem key={hour} value={hour.toString()}>
							{hour}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<span>:</span>
			<Select defaultValue="00" onValueChange={handleMinuteChange}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{Array.from({ length: 60 }, (_, index) => {
						const minute = index.toString().padStart(2, "0");
						return (
							<SelectItem key={`minute-${minute}`} value={minute}>
								{minute}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
			<Select defaultValue="AM" onValueChange={handleAmpmChange}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="AM">AM</SelectItem>
					<SelectItem value="PM">PM</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
//### InputWithIcon.tsx
"use client";
import * as React from "react";
import { Input, type InputProps } from "./Input";

export interface InputWithIconProps extends InputProps {
	label: string;
	id: string;
	icon: React.ReactNode; // Icon is expected for this component
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
	({ label, id, className, icon, ...props }, ref) => {
		return (
			<div className="relative z-0 mb-2 flex items-center w-full">
				<div className="absolute ml-2 opacity-70">{icon}</div>
				<Input
					ref={ref}
					id={id}
					type="text"
					className={`pl-8 pr-4 pt-4 pb-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none dark:text-white dark:border-gray-800 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${className}`}
					placeholder=" "
					{...props}
				/>
				<label
					htmlFor={id}
					className="absolute left-8 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
				>
					{label}
				</label>
			</div>
		);
	},
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };

When i tried to entered the date and time, it recognized the hour, as soon as I entered the minutes, it goes back to 12:00a.m. and then it stops updating the time. 

