// LinkGenerator.tsx
import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import JobNumberInput from "./JobNumberInput";
import FetchDetailsButton from "./FetchDetailsButton";
import ManualEntrySwitch from "./ManualEntrySwitch";
import { Separator } from "../ui/separator";
import ManualTitle from "./ManualTitle";
import LanguageSelector from "./LanguageSelector";
import DatePicker from "./Datepicker";
import TimeInput from "./TimeInput";
import { Duration } from "./Duration";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { FormValues } from "./types";

// const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_KEY");

const formSchema = z.object({
	jobNumber: z.string().min(5, "Job number must be 5 digits").max(5),
	manualTitle: z.string().optional(),
	language: z.string(),
	date: z.preprocess((arg) => {
		if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
	}, z.date()),
	time: z.string(), // Consider more specific validation if needed
	duration: z.number().min(15, "Duration must be at least 15 minutes"),
});

export function LinkGenerator() {
	const {
		register,
		handleSubmit,
		control,
		setError,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			const parsedData = formSchema.parse(data);
			// ... Your Supabase and Zoom logic using parsedData
		} catch (error) {
			if (error instanceof z.ZodError) {
				for (const issue of error.issues) {
					setError(issue.path[0] as keyof FormValues, {
						type: "manual",
						message: issue.message,
					});
				}
			} else {
				console.error("Error pushing data:", error);
			}
		}
	};

	return (
		<Card className="w-[650px]">
			<CardHeader>
				<CardTitle className="flex items-center justify-center">
					Auto Link Generator
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid w-full items-center gap-4">
						<JobNumberInput register={register} />
						<FetchDetailsButton />
						<ManualEntrySwitch />
						<Separator />
						<ManualTitle register={register} />
						<LanguageSelector register={register} />
						<div className="flex space-x-4">
							<DatePicker control={control} name="date" />
							<TimeInput register={register} />
						</div>
						<Duration register={register} />
					</div>
					<CardFooter className="flex justify-between">
						<Button variant="outline" type="reset">
							Clear
						</Button>
						<Button type="submit">Generate Link</Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	);
}
