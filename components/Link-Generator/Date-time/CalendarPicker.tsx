import React from "react";
import { Calendar } from "@/components/ui/calendar";

interface CalendarPickerProps {
	selectedDate: Date | null;
	onDateChange: (date: Date | undefined) => void;
	disabled?: boolean;
}

export const CalendarPicker = ({
	selectedDate,
	onDateChange,
	disabled = false,
}: CalendarPickerProps) => {
	return (
		<Calendar
			selected={selectedDate ?? undefined} // Handle null to undefined conversion
			initialFocus
			mode="single"
			onSelect={onDateChange}
			className="mb-4"
			disabled={disabled}
		/>
	);
};
