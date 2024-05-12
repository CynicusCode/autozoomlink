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
