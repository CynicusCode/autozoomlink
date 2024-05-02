"use client";
import { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext, useWatch } from "react-hook-form";
import { timeZones } from "./timeZones";

export const TimeZoneSelector: React.FC<{ disabled: boolean }> = ({
	disabled,
}) => {
	const { setValue, control } = useFormContext();
	const selectedTimeZone = useWatch({
		control,
		name: "timeZone",
		defaultValue: "",
	});
	const [searchTerm, setSearchTerm] = useState("");

	const handleSelectTimeZone = (label: string) => {
		const timezone = timeZones.find((tz) => tz.label === label);
		if (timezone) {
			setValue("timeZone", timezone.value);
		}
	};

	const filteredTimeZones = searchTerm
		? timeZones.filter((tz) =>
				tz.label.toLowerCase().includes(searchTerm.toLowerCase()),
			)
		: timeZones;

	return (
		<div className="flex items-center gap-2">
			<label htmlFor="timezone-select" className="whitespace-nowrap">
				Time Zone:
			</label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-labelledby="timezone-label"
						aria-controls="timezone-select"
						disabled={disabled}
						className={cn(
							"w-[418px] justify-between",
							!selectedTimeZone && "text-muted-foreground",
						)}
					>
						{selectedTimeZone
							? timeZones.find((tz) => tz.value === selectedTimeZone)?.label
							: "Select time zone"}
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[400px] p-0">
					<Command>
						<CommandInput
							placeholder="Search time zone..."
							disabled={disabled}
							onValueChange={setSearchTerm}
						/>
						<CommandEmpty>No time zone found.</CommandEmpty>
						<CommandList>
							<CommandGroup>
								{filteredTimeZones.map((timeZone) => (
									<CommandItem
										key={timeZone.value}
										value={timeZone.label}
										onSelect={() => handleSelectTimeZone(timeZone.label)}
										className={cn(
											'data-[aria-selected="true"]:bg-accent data-[aria-selected="true"]:text-accent-foreground',
										)}
									>
										{timeZone.label}
										<CheckIcon
											className={cn(
												"ml-auto h-4 w-4",
												selectedTimeZone === timeZone.value
													? "opacity-100"
													: "opacity-0",
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<input
				type="hidden"
				id="timezone-select"
				value={selectedTimeZone}
				readOnly
				aria-label="Selected time zone"
			/>
		</div>
	);
};

export default TimeZoneSelector;
