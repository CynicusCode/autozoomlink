// date-time-picker.tsx
"use client";

import * as React from "react";
import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker12Demo } from "./time-picker-12hour-demo";

export function DateTimePicker() {
	const [date, setDate] = React.useState<Date>(new Date());

	const handleSelect = (newDay: Date | undefined) => {
		if (!newDay) return;
		const newDate = new Date(
			date.setFullYear(
				newDay.getFullYear(),
				newDay.getMonth(),
				newDay.getDate(),
			),
		);
		setDate(newDate);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? (
						format(date, "PP hh:mm a")
					) : (
						<span>Pick a date and time</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={handleSelect}
					initialFocus
				/>
				<div className="p-3 border-t border-border">
					<TimePicker12Demo setDate={setDate} date={date} />
				</div>
			</PopoverContent>
		</Popover>
	);
}
