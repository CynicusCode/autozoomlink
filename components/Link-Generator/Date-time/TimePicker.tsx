// TimePicker.tsx
import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
	onTimeChange: (hour: number, minute: number, ampm: string) => void;
}

export const TimePicker = ({ onTimeChange }: TimePickerProps) => {
	const handleHourChange = (newHour: string) => {
		onTimeChange(Number(newHour), 0, "AM"); // Defaulting minute and ampm for simplicity
	};

	const handleMinuteChange = (newMinute: string) => {
		onTimeChange(0, Number(newMinute), "AM"); // Defaulting hour and ampm for simplicity
	};

	const handleAmpmChange = (newAmpm: string) => {
		onTimeChange(0, 0, newAmpm); // Defaulting hour and minute for simplicity
	};

	return (
		<div className="flex gap-2 justify-center">
			<Select defaultValue="12" onValueChange={handleHourChange}>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{Array.from({ length: 12 }, (_, index) => index + 1).map((hour) => (
						<SelectItem key={hour} value={hour.toString()}>
							{hour}
						</SelectItem>
					))}
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
	);
};
