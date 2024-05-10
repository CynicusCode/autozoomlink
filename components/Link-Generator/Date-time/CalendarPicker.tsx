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
