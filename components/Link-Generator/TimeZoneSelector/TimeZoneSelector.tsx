"use client";
import { useEffect, useState } from "react";
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
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "./types";
import { useFormContext, useWatch } from "react-hook-form";

const timeZones = [
	{
		label: "Pacific Time (US and Canada)",
		value: "America/Los_Angeles",
	},
	{ label: "Mountain Time (US and Canada)", value: "America/Denver" },
	{ label: "Central Time (US and Canada)", value: "America/Chicago" },
	{ label: "Eastern Time (US and Canada)", value: "America/New_York" },
	{ label: "Hawaii", value: "Pacific/Honolulu" },
	{ label: "Arizona", value: "America/Phoenix" },
	{ label: "Midway Island, Samoa", value: "Pacific/Midway" },
	{ label: "Alaska", value: "America/Anchorage" },
	{ label: "Pago Pago", value: "Pacific/Pago_Pago" },
	{ label: "Vancouver", value: "America/Vancouver" },
	{ label: "Tijuana", value: "America/Tijuana" },
	{ label: "Edmonton", value: "America/Edmonton" },
	{ label: "Mazatlan", value: "America/Mazatlan" },
	{ label: "Winnipeg", value: "America/Winnipeg" },
	{ label: "Saskatchewan", value: "America/Regina" },
	{ label: "Mexico City", value: "America/Mexico_City" },
	{ label: "Guatemala", value: "America/Guatemala" },
	{ label: "El Salvador", value: "America/El_Salvador" },
	{ label: "Managua", value: "America/Managua" },
	{ label: "Costa Rica", value: "America/Costa_Rica" },
	{ label: "Montreal", value: "America/Montreal" },
	{ label: "Indiana (East)", value: "America/Indianapolis" },
	{ label: "Panama", value: "America/Panama" },
	{ label: "Bogota", value: "America/Bogota" },
	{ label: "Lima", value: "America/Lima" },
	{ label: "Halifax", value: "America/Halifax" },
	{ label: "Puerto Rico", value: "America/Puerto_Rico" },
	{ label: "Caracas", value: "America/Caracas" },
	{ label: "Santiago", value: "America/Santiago" },
	{ label: "Newfoundland and Labrador", value: "America/St_Johns" },
	{ label: "Montevideo", value: "America/Montevideo" },
	{ label: "Brasilia", value: "America/Araguaina" },
	{
		label: "Buenos Aires, Georgetown",
		value: "America/Argentina/Buenos_Aires",
	},
	{ label: "Greenland", value: "America/Godthab" },
	{ label: "Sao Paulo", value: "America/Sao_Paulo" },
	{ label: "Azores", value: "Atlantic/Azores" },
	{ label: "Atlantic Time (Canada)", value: "Canada/Atlantic" },
	{ label: "Cape Verde Islands", value: "Atlantic/Cape_Verde" },
	{ label: "Universal Time UTC", value: "UTC" },
	{ label: "Greenwich Mean Time", value: "Etc/Greenwich" },
	{
		label: "Belgrade, Bratislava, Ljubljana",
		value: "Europe/Belgrade",
	},
	{ label: "Sarajevo, Skopje, Zagreb", value: "CET" },
	{ label: "Reykjavik", value: "Atlantic/Reykjavik" },
	{ label: "Dublin", value: "Europe/Dublin" },
	{ label: "London", value: "Europe/London" },
	{ label: "Lisbon", value: "Europe/Lisbon" },
	{ label: "Casablanca", value: "Africa/Casablanca" },
	{ label: "Nouakchott", value: "Africa/Nouakchott" },
	{ label: "Oslo", value: "Europe/Oslo" },
	{ label: "Copenhagen", value: "Europe/Copenhagen" },
	{ label: "Brussels", value: "Europe/Brussels" },
	{
		label: "Amsterdam, Berlin, Rome, Stockholm, Vienna",
		value: "Europe/Berlin",
	},
	{ label: "Helsinki", value: "Europe/Helsinki" },
	{ label: "Amsterdam", value: "Europe/Amsterdam" },
	{ label: "Rome", value: "Europe/Rome" },
	{ label: "Stockholm", value: "Europe/Stockholm" },
	{ label: "Vienna", value: "Europe/Vienna" },
	{ label: "Luxembourg", value: "Europe/Luxembourg" },
	{ label: "Paris", value: "Europe/Paris" },
	{ label: "Zurich", value: "Europe/Zurich" },
	{ label: "Madrid", value: "Europe/Madrid" },
	{ label: "West Central Africa", value: "Africa/Bangui" },
	{ label: "Algiers", value: "Africa/Algiers" },
	{ label: "Tunis", value: "Africa/Tunis" },
	{ label: "Harare, Pretoria", value: "Africa/Harare" },
	{ label: "Nairobi", value: "Africa/Nairobi" },
	{ label: "Warsaw", value: "Europe/Warsaw" },
	{ label: "Prague Bratislava", value: "Europe/Prague" },
	{ label: "Budapest", value: "Europe/Budapest" },
	{ label: "Sofia", value: "Europe/Sofia" },
	{ label: "Istanbul", value: "Europe/Istanbul" },
	{ label: "Athens", value: "Europe/Athens" },
	{ label: "Bucharest", value: "Europe/Bucharest" },
	{ label: "Nicosia", value: "Asia/Nicosia" },
	{ label: "Beirut", value: "Asia/Beirut" },
	{ label: "Damascus", value: "Asia/Damascus" },
	{ label: "Jerusalem", value: "Asia/Jerusalem" },
	{ label: "Amman", value: "Asia/Amman" },
	{ label: "Tripoli", value: "Africa/Tripoli" },
	{ label: "Cairo", value: "Africa/Cairo" },
	{ label: "Johannesburg", value: "Africa/Johannesburg" },
	{ label: "Moscow", value: "Europe/Moscow" },
	{ label: "Baghdad", value: "Asia/Baghdad" },
	{ label: "Kuwait", value: "Asia/Kuwait" },
	{ label: "Riyadh", value: "Asia/Riyadh" },
	{ label: "Bahrain", value: "Asia/Bahrain" },
	{ label: "Qatar", value: "Asia/Qatar" },
	{ label: "Aden", value: "Asia/Aden" },
	{ label: "Tehran", value: "Asia/Tehran" },
	{ label: "Khartoum", value: "Africa/Khartoum" },
	{ label: "Djibouti", value: "Africa/Djibouti" },
	{ label: "Mogadishu", value: "Africa/Mogadishu" },
	{ label: "Dubai", value: "Asia/Dubai" },
	{ label: "Muscat", value: "Asia/Muscat" },
	{ label: "Baku, Tbilisi, Yerevan", value: "Asia/Baku" },
	{ label: "Kabul", value: "Asia/Kabul" },
	{ label: "Yekaterinburg", value: "Asia/Yekaterinburg" },
	{ label: "Islamabad, Karachi, Tashkent", value: "Asia/Tashkent" },
	{ label: "India", value: "Asia/Calcutta" },
	{ label: "Kathmandu", value: "Asia/Kathmandu" },
	{ label: "Novosibirsk", value: "Asia/Novosibirsk" },
	{ label: "Almaty", value: "Asia/Almaty" },
	{ label: "Dacca", value: "Asia/Dacca" },
	{ label: "Krasnoyarsk", value: "Asia/Krasnoyarsk" },
	{ label: "Astana, Dhaka", value: "Asia/Dhaka" },
	{ label: "Bangkok", value: "Asia/Bangkok" },
	{ label: "Vietnam", value: "Asia/Saigon" },
	{ label: "Jakarta", value: "Asia/Jakarta" },
	{ label: "Irkutsk, Ulaanbaatar", value: "Asia/Irkutsk" },
	{ label: "Beijing, Shanghai", value: "Asia/Shanghai" },
	{ label: "Hong Kong", value: "Asia/Hong_Kong" },
	{ label: "Taipei", value: "Asia/Taipei" },
	{ label: "Kuala Lumpur", value: "Asia/Kuala_Lumpur" },
	{ label: "Singapore", value: "Asia/Singapore" },
	{ label: "Perth", value: "Australia/Perth" },
	{ label: "Yakutsk", value: "Asia/Yakutsk" },
	{ label: "Seoul", value: "Asia/Seoul" },
	{ label: "Osaka, Sapporo, Tokyo, Japan", value: "Asia/Tokyo" },
	{ label: "Darwin", value: "Australia/Darwin" },
	{ label: "Adelaide", value: "Australia/Adelaide" },
	{ label: "Vladivostok", value: "Asia/Vladivostok" },
	{ label: "Guam, Port Moresby", value: "Pacific/Port_Moresby" },
	{ label: "Brisbane", value: "Australia/Brisbane" },
	{ label: "Canberra, Melbourne, Sydney", value: "Australia/Sydney" },
	{ label: "Hobart", value: "Australia/Hobart" },
	{ label: "Magadan", value: "Asia/Magadan" },
	{ label: "Solomon Islands", value: "SST" },
	{ label: "New Caledonia", value: "Pacific/Noumea" },
	{ label: "Kamchatka", value: "Asia/Kamchatka" },
	{ label: "Fiji Islands, Marshall Islands", value: "Pacific/Fiji" },
	{ label: "Auckland, Wellington", value: "Pacific/Auckland" },
	{ label: "Mumbai, Kolkata, New Delhi", value: "Asia/Kolkata" },
	{ label: "Kiev", value: "Europe/Kiev" },
	{ label: "Tegucigalpa", value: "America/Tegucigalpa" },
	{ label: "Independent State of Samoa", value: "Pacific/Apia" },
] as const;

interface TimeZoneSelectorProps {
	disabled: boolean;
}

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
			<label className="whitespace-nowrap">Time Zone:</label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
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
			<input type="hidden" value={selectedTimeZone} readOnly />
		</div>
	);
};

export default TimeZoneSelector;
