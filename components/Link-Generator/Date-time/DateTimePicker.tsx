import type React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { Input } from "@/components/ui/Input";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface DateTimeState {
	date: Date | null;
	hour: number;
	minute: number;
	ampm: string;
}

const DateTimePickerInput = () => {
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

	const handleHourChange = (newHour: string) => {
		setDateTime((prev) => ({ ...prev, hour: Number.parseInt(newHour, 10) }));
	};

	const handleMinuteChange = (newMinute: string) => {
		setDateTime((prev) => ({
			...prev,
			minute: Number.parseInt(newMinute, 10),
		}));
	};

	const handleAmpmChange = (newAmpm: string) => {
		setDateTime((prev) => ({ ...prev, ampm: newAmpm }));
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
			<div className="flex items-center">
				<Input
					className="pr-10 w-full"
					placeholder="MM/DD/YYYY hh:mm AM/PM"
					type="text"
					value={formatDateTime()}
					readOnly
				/>
				<Popover>
					<PopoverTrigger asChild>
						<div className="absolute right-3 h-5 w-5 text-gray-400 cursor-pointer">
							<CalendarIcon />
						</div>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<div className=" rounded-lg shadow-lg p-8">
							<Calendar
								initialFocus
								mode="single"
								onSelect={handleDateChange}
								className="mb-4"
							/>
							<div className="flex gap-2 justify-center">
								<Select defaultValue="12" onValueChange={handleHourChange}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{Array.from({ length: 12 }, (_, index) => index + 1).map(
											(hour) => (
												<SelectItem key={hour} value={hour.toString()}>
													{hour}
												</SelectItem>
											),
										)}
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
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth={2}
		aria-labelledby="calendarIconTitle"
	>
		<title id="calendarIconTitle">Open Calendar</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
		/>
	</svg>
);

export default DateTimePickerInput;
