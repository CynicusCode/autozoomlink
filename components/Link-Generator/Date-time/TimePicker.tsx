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
	// Use local state to keep track of changes until they are committed
	const [hour, setHour] = React.useState("12");
	const [minute, setMinute] = React.useState("00");
	const [ampm, setAmpm] = React.useState("AM");

	const handleHourChange = (newHour: string) => {
		setHour(newHour);
		onTimeChange(Number(newHour), Number(minute), ampm);
	};

	const handleMinuteChange = (newMinute: string) => {
		setMinute(newMinute);
		onTimeChange(Number(hour), Number(newMinute), ampm);
	};

	const handleAmpmChange = (newAmpm: string) => {
		setAmpm(newAmpm);
		onTimeChange(Number(hour), Number(minute), newAmpm);
	};

	return (
		<div className="flex gap-2 justify-center">
			<Select defaultValue={hour} onValueChange={handleHourChange}>
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
			<Select defaultValue={minute} onValueChange={handleMinuteChange}>
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
			<Select defaultValue={ampm} onValueChange={handleAmpmChange}>
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
