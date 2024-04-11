"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

// Function to generate time slots in 30-minute intervals
const generateTimeSlots = () => {
	const slots = [];
	for (let hour = 0; hour < 24; hour++) {
		const hourFormatted = hour < 10 ? `0${hour}` : `${hour}`;
		slots.push(`${hourFormatted}:00`);
		slots.push(`${hourFormatted}:30`);
	}
	return slots;
};

const timeSlots = generateTimeSlots();

export function TimeSelector() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");
	const [inputValue, setInputValue] = React.useState("");

	// Filter time slots based on input value
	const filteredTimeSlots = timeSlots.filter((slot) =>
		slot.includes(inputValue),
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value || "Select time..."}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput
						placeholder="Enter time..."
						className="h-9"
						value={inputValue}
						onValueChange={(newValue) => {
							setInputValue(newValue);
						}}
					/>
					<CommandEmpty>No time found.</CommandEmpty>
					<CommandGroup>
						{filteredTimeSlots.map((timeSlot) => (
							<CommandItem
								key={timeSlot}
								value={timeSlot}
								onSelect={(selectedValue) => {
									setValue(selectedValue);
									setOpen(false);
								}}
							>
								{timeSlot}
								<CheckIcon
									className={cn(
										"ml-auto h-4 w-4",
										value === timeSlot ? "opacity-100" : "opacity-0",
									)}
								/>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default TimeSelector;
