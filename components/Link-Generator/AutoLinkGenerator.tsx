//AutoLinkGenerator.tsx
"use client";
// 1. External libraries
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

// 2. Component library imports
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import DateTimePicker from "@/components/Link-Generator/Date-time/DateTimePicker";

// 3. Local project files
import FetchDetailsButton from "./FetchDetailsButton";
import JobNumberInput from "./JobNumberInput";
import { LanguageSelector } from "./LanguageSelector";
import ManualEntrySwitch from "./ManualEntryswitch";
import ManualTitle from "./ManualTitle";
import { schema, type FormValues } from "./formSchema";
import { Separator } from "../ui/separator";
import TimeZoneSelector from "./TimeZoneSelector/TimeZoneSelector";
import { Duration } from "./Duration";

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
					<Duration disabled={isAutomaticMode} />
					<LanguageSelector disabled={isAutomaticMode} />
					<DateTimePicker disabled={isAutomaticMode} />
					<TimeZoneSelector disabled={isAutomaticMode} />
				</FormProvider>
			</CardContent>
			<Separator />
			<CardFooter className="flex justify-between mt-4">
				<Button type="reset">Clear</Button>
				<Button type="submit">Generate Link</Button>
			</CardFooter>
			<p className="text-sm text-muted-foreground items-center justify-center flex pb-2">
				Contact me: dev.daniel.garcia@gmail.com
			</p>
		</Card>
	);
};

export default AutoLinkGenerator;
