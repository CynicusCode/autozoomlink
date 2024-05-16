// External libraries
import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { CalendarIcon } from "@radix-ui/react-icons";

// UI components from your project
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { InputWithIcon } from "@/components/ui/InputWithIcon";

// Local components
import { CalendarPicker } from "./CalendarPicker";
import { TimePicker } from "./TimePicker";

// Use the plugins
dayjs.extend(utc);
dayjs.extend(timezone);

interface DateTimeState {
	date: Date | null;
	hour: number;
	minute: number;
	ampm: string;
}

export const DateTimePicker = ({ disabled = false }) => {
	const { setValue, control } = useFormContext();

	// Watch specific form fields
	const formData = useWatch({
		control,
		name: "expectedStartDate", // Assuming this is a singular field you're watching
	});

	const [dateTime, setDateTime] = useState<DateTimeState>({
		date: formData ? dayjs.utc(formData).toDate() : null,
		hour: 12,
		minute: 0,
		ampm: "AM",
	});

	// Effect to update internal component state when watched fields change
	useEffect(() => {
		if (formData) {
			const parsedDate = dayjs.utc(formData);
			setDateTime({
				date: parsedDate.toDate(),
				hour:
					parsedDate.hour() > 12 ? parsedDate.hour() - 12 : parsedDate.hour(),
				minute: parsedDate.minute(),
				ampm: parsedDate.hour() >= 12 ? "PM" : "AM",
			});
		}
	}, [formData]);

	const handleDateChange = (newDate: Date | undefined) => {
		if (newDate) {
			const updatedDate = dayjs(newDate)
				.hour(
					dateTime.ampm === "PM" ? (dateTime.hour % 12) + 12 : dateTime.hour,
				)
				.minute(dateTime.minute)
				.second(0)
				.millisecond(0)
				.utc()
				.toISOString();
			setValue("expectedStartDate", updatedDate, { shouldValidate: true });
			setDateTime((prev) => ({ ...prev, date: newDate }));
		}
	};

	const handleTimeChange = (hour: number, minute: number, ampm: string) => {
		const updatedDate = dateTime.date
			? dayjs(dateTime.date)
					.hour(ampm === "PM" ? (hour % 12) + 12 : hour)
					.minute(minute)
					.second(0)
					.millisecond(0)
					.utc()
					.toISOString()
			: null;
		setValue("expectedStartDate", updatedDate, { shouldValidate: true });
		setDateTime((prev) => ({ ...prev, hour, minute, ampm }));
	};

	const formatDateTime = () => {
		if (!dateTime.date) return "";
		const localDateTime = dayjs(dateTime.date)
			.hour(
				dateTime.ampm === "PM" ? (dateTime.hour % 12) + 12 : dateTime.hour % 12,
			)
			.minute(dateTime.minute);
		return localDateTime.format("MM/DD/YYYY hh:mm A");
	};

	return (
		<div className="relative w-full max-w-sm">
			<Popover>
				<PopoverTrigger asChild>
					<div className="w-full cursor-pointer flex items-center relative">
						<label
							htmlFor="timezone-select"
							className="whitespace-nowrap text-sm font-medium pr-2"
						>
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
							disabled={disabled}
						/>
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<div className="rounded-lg shadow-lg p-8">
						<CalendarPicker
							onDateChange={handleDateChange}
							disabled={disabled}
						/>
						<TimePicker onTimeChange={handleTimeChange} disabled={disabled} />
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DateTimePicker;
