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

const languages = [
	{ label: "Spanish", value: "Spanish" },
	{ label: "Chinese", value: "Chinese" },
	{ label: "Vietnamese", value: "Vietnamese" },
	{ label: "Tagalog", value: "Tagalog" },
	{ label: "Arabic", value: "Arabic" },
	{ label: "French", value: "French" },
	{ label: "Korean", value: "Korean" },
	{ label: "Russian", value: "Russian" },
	{ label: "German", value: "German" },
	{ label: "Haitian Creole", value: "Haitian Creole" },
	{ label: "Portuguese", value: "Portuguese" },
	{ label: "Italian", value: "Italian" },
	{ label: "Polish", value: "Polish" },
	{ label: "Urdu", value: "Urdu" },
	{ label: "Japanese", value: "Japanese" },
	{ label: "Persian", value: "Persian" },
	{ label: "Gujarati", value: "Gujarati" },
	{ label: "Bengali", value: "Bengali" },
	{ label: "American Sign Language", value: "ASL" },
	{ label: "Certified Deaf Interpreter", value: "CDI" },
] as const;

export function LanguageSelector() {
	const [selectedLanguage, setSelectedLanguage] = useState("");

	return (
		<div className="flex flex-col">
			<label>Language</label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						className={cn(
							"w-[200px] justify-between",
							!selectedLanguage && "text-muted-foreground",
						)}
					>
						{selectedLanguage
							? languages.find(
									(language) => language.value === selectedLanguage,
								)?.label
							: "Select language"}
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Search language..." />
						<CommandEmpty>No language found.</CommandEmpty>
						<CommandList>
							<CommandGroup>
								{languages.map((language) => (
									<CommandItem
										key={language.value}
										value={language.value}
										onSelect={() => {
											setSelectedLanguage(language.value);
										}}
										className={cn(
											'data-[aria-selected="true"]:bg-accent data-[aria-selected="true"]:text-accent-foreground data-[disabled="true"]:pointer-events-none data-[disabled="true"]:opacity-50',
										)}
									>
										{language.label}
										<CheckIcon
											className={cn(
												"ml-auto h-4 w-4",
												selectedLanguage === language.value
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
		</div>
	);
}

export default LanguageSelector;
