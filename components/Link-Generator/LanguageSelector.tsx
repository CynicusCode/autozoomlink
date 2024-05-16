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
import { languages } from "./languages";

interface LanguageSelectorProps {
	disabled: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
	disabled,
}) => {
	const { setValue, control } = useFormContext();
	const selectedLanguage = useWatch({
		control,
		name: "language",
		defaultValue: "",
	});

	const handleSelectLanguage = (value: string) => {
		setValue("language", value);
	};

	return (
		<div className="flex items-center gap-2">
			<label className="whitespace-nowrap text-sm font-medium">Language:</label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						disabled={disabled}
						className={cn(
							"w-[200px] justify-between",
							!selectedLanguage && "text-muted-foreground",
						)}
					>
						{selectedLanguage
							? languages.find((lang) => lang.value === selectedLanguage)?.label
							: "Select language"}
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[250px] p-0">
					<Command>
						<CommandInput
							placeholder="Search language..."
							disabled={disabled}
						/>
						<CommandEmpty>No language found.</CommandEmpty>
						<CommandList>
							<CommandGroup>
								{languages.map((language) => (
									<CommandItem
										key={language.value}
										value={language.value}
										onSelect={() => handleSelectLanguage(language.value)}
										className={cn(
											'data-[aria-selected="true"]:bg-accent data-[aria-selected="true"]:text-accent-foreground',
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
			<input type="hidden" value={selectedLanguage} readOnly />
		</div>
	);
};

export default LanguageSelector;
