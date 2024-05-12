// CalendarPicker.tsx
import React from "react";
import { Calendar } from "@/components/ui/calendar";

interface CalendarPickerProps {
	onDateChange: (date: Date | undefined) => void;
	disabled?: boolean;
}

export const CalendarPicker = ({
	onDateChange,
	disabled = false,
}: CalendarPickerProps) => {
	return (
		<Calendar
			initialFocus
			mode="single"
			onSelect={onDateChange}
			className="mb-4"
			disabled={disabled}
		/>
	);
};
