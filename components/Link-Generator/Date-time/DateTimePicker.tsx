import React, { useState, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import dayjs from "dayjs";
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

interface DateTimeState {
	date: Date | null;
	hour: number;
	minute: number;
	ampm: string;
}

export const DateTimePicker = ({ disabled = false }) => {
	const { setValue, control } = useFormContext();

	// Watch the expectedStartDate field
	const expectedStartDate = useWatch({
		control,
		name: "expectedStartDate",
		defaultValue: null,
	});

	const [dateTime, setDateTime] = useState<DateTimeState>({
		date: expectedStartDate ? new Date(expectedStartDate) : null,
		hour: 12,
		minute: 0,
		ampm: "AM",
	});

	useEffect(() => {
		if (expectedStartDate) {
			const parsedDate = dayjs(expectedStartDate);
			setDateTime({
				date: parsedDate.toDate(),
				hour:
					parsedDate.hour() > 12 ? parsedDate.hour() - 12 : parsedDate.hour(),
				minute: parsedDate.minute(),
				ampm: parsedDate.hour() >= 12 ? "PM" : "AM",
			});
		}
	}, [expectedStartDate]);

	const handleDateChange = (newDate: Date | undefined) => {
		if (newDate) {
			setValue("expectedStartDate", dayjs(newDate).toISOString(), {
				shouldValidate: true,
			});
			setDateTime((prev) => ({ ...prev, date: newDate }));
		}
	};

	const handleTimeChange = (hour: number, minute: number, ampm: string) => {
		const updatedDate = dateTime.date
			? dayjs(dateTime.date).hour(hour).minute(minute).toISOString()
			: null;
		setValue("expectedStartDate", updatedDate, { shouldValidate: true });
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
