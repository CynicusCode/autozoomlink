// AutoLinkGenerator.tsx
"use client";
// 1. External libraries
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";

// 2. Component library imports
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 3. Local project files
import DateTimePicker from "@/components/Link-Generator/Date-time/DateTimePicker";
import FetchDetailsButton from "./FetchDetailsButton";
import JobNumberInput from "./JobNumberInput";
import { LanguageSelector } from "./LanguageSelector";
import ManualEntrySwitch from "./ManualEntryswitch";
import { schema, type FormValues } from "./formSchema";
import { Separator } from "../ui/separator";
import TimeZoneSelector from "./TimeZoneSelector/TimeZoneSelector";
import { Duration } from "./Duration";
import GenerateZoomLink from "./Zoom/GenerateZoomLink";
import ManualTitle from "./ManualTitle";

const AutoLinkGenerator: React.FC = () => {
	const [jobNumber, setJobNumber] = useState("");
	const [isAutomaticMode, setIsAutomaticMode] = useState(false);

	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormValues) => {
		console.log("Form data on submit:", data); // Log all form values with local date-time
		// Add your Zoom link generation logic here
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

					<Separator />
					<CardFooter className="flex justify-between mt-4">
						<Button type="reset">Clear</Button>
						<GenerateZoomLink onClick={methods.handleSubmit(onSubmit)} />
					</CardFooter>
				</FormProvider>
			</CardContent>
			<p className="text-sm text-muted-foreground items-center justify-center flex pb-2">
				Contact me: dev.daniel.garcia@gmail.com
			</p>
		</Card>
	);
};

export default AutoLinkGenerator;
