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
import { CalendarIcon } from "./CalendarIcon";

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
						<Input
							className="w-full pr-10 pl-10" // Adjusted padding
							placeholder="MM/DD/YYYY HH:MM AM/PM"
							type="text"
							value={formatDateTime()}
							readOnly
						/>
						<div className="absolute left-31 inset-y-0 my-auto h-6 w-6 text-gray-400">
							<CalendarIcon />
						</div>
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
