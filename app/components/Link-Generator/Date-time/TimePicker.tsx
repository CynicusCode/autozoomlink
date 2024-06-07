import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";

interface TimePickerProps {
	onTimeChange: (hour: number, minute: number, ampm: string) => void;
	hour: number;
	minute: number;
	ampm: string;
	disabled?: boolean;
}

export const TimePicker = ({
	onTimeChange,
	hour: initialHour,
	minute: initialMinute,
	ampm: initialAmpm,
	disabled = false,
}: TimePickerProps) => {
	// Use local state to keep track of changes until they are committed
	const [hour, setHour] = React.useState(
		initialHour.toString().padStart(2, "0"),
	);
	const [minute, setMinute] = React.useState(
		initialMinute.toString().padStart(2, "0"),
	);
	const [ampm, setAmpm] = React.useState(initialAmpm);

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
			<Select value={hour} onValueChange={handleHourChange} disabled={disabled}>
				<SelectTrigger>
					<SelectValue placeholder="HH" />
				</SelectTrigger>
				<SelectContent>
					{Array.from({ length: 12 }, (_, index) =>
						(index + 1).toString().padStart(2, "0"),
					).map((hour) => (
						<SelectItem key={hour} value={hour} disabled={disabled}>
							{hour}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<span>:</span>
			<Select
				value={minute}
				onValueChange={handleMinuteChange}
				disabled={disabled}
			>
				<SelectTrigger>
					<SelectValue placeholder="MM" />
				</SelectTrigger>
				<SelectContent>
					{Array.from({ length: 60 }, (_, index) =>
						index.toString().padStart(2, "0"),
					).map((minute) => (
						<SelectItem
							key={`minute-${minute}`}
							value={minute}
							disabled={disabled}
						>
							{minute}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select value={ampm} onValueChange={handleAmpmChange} disabled={disabled}>
				<SelectTrigger>
					<SelectValue placeholder="AM/PM" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="AM" disabled={disabled}>
						AM
					</SelectItem>
					<SelectItem value="PM" disabled={disabled}>
						PM
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};
