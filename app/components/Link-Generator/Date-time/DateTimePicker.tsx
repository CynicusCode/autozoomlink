import React, { useState, useEffect, useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "../../ui/popover";
import { InputWithIcon } from "../../ui/InputWithIcon";
import { CalendarPicker } from "./CalendarPicker";
import { TimePicker } from "./TimePicker";
import dayjs, { type Dayjs } from "dayjs";

dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

interface DateTimeState {
	date: Dayjs | null;
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
		defaultValue: null,
	});

	const parseDate = useCallback(
		(dateString: string): Dayjs => {
			let parsedDate: Dayjs = dayjs.utc(dateString);
			if (!parsedDate.isValid()) {
				parsedDate = dayjs.tz(dateString, "MM/DD/YYYY hh:mm A", timeZone);
			}
			return parsedDate;
		},
		[timeZone],
	);

	const [dateTime, setDateTime] = useState<DateTimeState>({
		date: uiExpectedStartDate ? parseDate(uiExpectedStartDate) : null,
		hour: uiExpectedStartDate
			? dayjs.tz(uiExpectedStartDate, timeZone).hour() % 12 || 12
			: 12,
		minute: uiExpectedStartDate
			? dayjs.tz(uiExpectedStartDate, timeZone).minute()
			: 0,
		ampm: uiExpectedStartDate
			? dayjs.tz(uiExpectedStartDate, timeZone).hour() >= 12
				? "PM"
				: "AM"
			: "AM",
	});

	useEffect(() => {
		if (uiExpectedStartDate) {
			const parsedDate = parseDate(uiExpectedStartDate);
			setDateTime({
				date: parsedDate,
				hour: parsedDate.hour() % 12 || 12,
				minute: parsedDate.minute(),
				ampm: parsedDate.hour() >= 12 ? "PM" : "AM",
			});
		} else {
			setDateTime({
				date: null,
				hour: 12,
				minute: 0,
				ampm: "AM",
			});
		}
	}, [uiExpectedStartDate, parseDate]);

	const handleDateChange = (newDate: Date | undefined) => {
		if (newDate) {
			const dayjsDate = dayjs.tz(newDate, timeZone);
			const formattedDate = dayjsDate.format("MM/DD/YYYY");
			const existingTime = `${dateTime.hour}:${String(dateTime.minute).padStart(2, "0")} ${dateTime.ampm}`;
			const combinedDateTime = `${formattedDate} ${existingTime}`;
			setValue("uiExpectedStartDate", combinedDateTime, {
				shouldValidate: true,
			});
			setDateTime({ ...dateTime, date: dayjsDate });
		} else {
			setValue("uiExpectedStartDate", null, { shouldValidate: true });
			setDateTime({ date: null, hour: 12, minute: 0, ampm: "AM" });
		}
	};

	const handleTimeChange = (hour: number, minute: number, ampm: string) => {
		const formattedDate = dateTime.date
			? dayjs.tz(dateTime.date.toDate(), timeZone).format("MM/DD/YYYY")
			: dayjs.tz(timeZone).format("MM/DD/YYYY");
		const combinedDateTime = `${formattedDate} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${ampm}`;
		setValue("uiExpectedStartDate", combinedDateTime, { shouldValidate: true });
		setDateTime((prev) => ({ ...prev, hour, minute, ampm }));
	};

	const formatDateTime = () => {
		if (!dateTime.date) return "";
		const dayjsDate = dayjs.tz(dateTime.date.toDate(), timeZone);
		const hour =
			dateTime.ampm === "PM" ? (dateTime.hour % 12) + 12 : dateTime.hour % 12;
		const formattedDateTime = dayjsDate
			.set("hour", hour)
			.set("minute", dateTime.minute)
			.format("MM/DD/YYYY hh:mm A");
		return formattedDateTime;
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
							selectedDate={dateTime.date ? dateTime.date.toDate() : null}
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
