//AutoLinkGenerator.tsx
"use client";
import type React from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type FormValues } from "./formSchema"; // Assuming schemas.ts is in the same directory
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
	CardTitle,
} from "@/components/ui/card";
import JobNumberInput from "./JobNumberInput";
import FetchDetailsButton from "./FetchDetailsButton";
import ManualEntrySwitch from "./ManualEntryswitch";
import ManualTitle from "./ManualTitle";
import { Separator } from "../ui/separator";
import LanguageSelector from "./LanguageSelector";
import { DateTimePicker } from "@/components/Link-Generator/Date-time/DateTimePicker";
import TimeZoneSelector from "./TimeZoneSelector/TimeZoneSelector";
import { Duration } from "./Duration";
import DatetimePickerForm from "./Date-time/DateTimeForm";

const AutoLinkGenerator: React.FC = () => {
	const [jobNumber, setJobNumber] = useState("");
	const [isAutomaticMode, setIsAutomaticMode] = useState(false);

	// Use useForm to manage form state and validation
	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormValues) => {
		console.log(data);
	};

	return (
		<Card className="w-[650px]">
			<CardHeader>
				<CardTitle className="flex items-center justify-center">
					Auto Link Generator
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Spread all useForm methods into FormProvider to make them available to all child components */}
				<FormProvider {...methods}>
					<JobNumberInput
						jobNumber={jobNumber}
						setJobNumber={setJobNumber}
						setIsAutomaticMode={setIsAutomaticMode}
					/>
					<FetchDetailsButton jobNumber={jobNumber} />
					<ManualEntrySwitch
						isAutomaticMode={isAutomaticMode}
						setIsAutomaticMode={setIsAutomaticMode}
					/>
					<Separator />
					<ManualTitle disabled={isAutomaticMode} />
					<DateTimePicker disabled={isAutomaticMode} granularity="minute" />
					<DatetimePickerForm disabled={isAutomaticMode} />
					<TimeZoneSelector disabled={isAutomaticMode} />
					<Duration disabled={isAutomaticMode} />
					<LanguageSelector disabled={isAutomaticMode} />
				</FormProvider>
			</CardContent>
			<CardFooter className="items-center justify-center flex">
				<p className="text-sm text-muted-foreground">
					Contact me: dev.daniel.garcia@gmail.com
				</p>
			</CardFooter>
		</Card>
	);
};

export default AutoLinkGenerator;
