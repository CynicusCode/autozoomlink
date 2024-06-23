import React, { useState, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "../../../../components/ui/popover";
import { InputWithIcon } from "../../../../components/ui/InputWithIcon";
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
	const timeZone = useWatch({ control, name: "timeZone" });

	const uiExpectedStartDate = useWatch({
		control,
		name: "uiExpectedStartDate",
		defaultValue: "",
	});

	const [dateTime, setDateTime] = useState<DateTimeState>({
		date: null,
		hour: 12,
		minute: 0,
		ampm: "AM",
	});

	useEffect(() => {
		if (uiExpectedStartDate) {
			const [datePart, timePart] = uiExpectedStartDate.split(" ");
			const [hourMinute, ampm] = timePart.split(" ");
			const [hour, minute] = hourMinute.split(":");

			const [month, day, year] = datePart.split("/");

			setDateTime({
				date: new Date(`${year}-${month}-${day}`),
				hour: Number.parseInt(hour),
				minute: Number.parseInt(minute),
				ampm: ampm,
			});
		} else {
			setDateTime({
				date: null,
				hour: 12,
				minute: 0,
				ampm: "AM",
			});
		}
	}, [uiExpectedStartDate]);

	const handleDateChange = (newDate: Date | undefined) => {
		if (newDate) {
			const formattedDate = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
			const existingTime = `${String(dateTime.hour).padStart(2, "0")}:${String(dateTime.minute).padStart(2, "0")} ${dateTime.ampm}`;
			const combinedDateTime = `${formattedDate} ${existingTime}`;
			setValue("uiExpectedStartDate", combinedDateTime, {
				shouldValidate: true,
			});
			setDateTime({ ...dateTime, date: newDate });
		} else {
			setValue("uiExpectedStartDate", "", { shouldValidate: true });
			setDateTime({ date: null, hour: 12, minute: 0, ampm: "AM" });
		}
	};

	const handleTimeChange = (hour: number, minute: number, ampm: string) => {
		const formattedDate = dateTime.date
			? `${dateTime.date.getMonth() + 1}/${dateTime.date.getDate()}/${dateTime.date.getFullYear()}`
			: `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
		const combinedDateTime = `${formattedDate} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${ampm}`;
		setValue("uiExpectedStartDate", combinedDateTime, { shouldValidate: true });
		setDateTime((prev) => ({ ...prev, hour, minute, ampm }));
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
							placeholder="MM/DD/YYYY hh:mm A"
							type="text"
							value={uiExpectedStartDate}
							readOnly
							disabled={disabled}
						/>
					</div>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<div className="rounded-lg shadow-lg p-8">
						<CalendarPicker
							selectedDate={dateTime.date}
							onDateChange={handleDateChange}
							disabled={disabled}
						/>
						<TimePicker
							onTimeChange={handleTimeChange}
							disabled={disabled}
							hour={dateTime.hour}
							minute={dateTime.minute}
							ampm={dateTime.ampm}
						/>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DateTimePicker;
