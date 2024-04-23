// AutoLinkGenerator.tsx
"use client";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

const AutoLinkGenerator: React.FC = () => {
	const [jobNumber, setJobNumber] = useState("");
	const [isAutomaticMode, setIsAutomaticMode] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<ManualTitle register={register} disabled={isAutomaticMode} />
					<button type="submit" className="mt-4">
						Submit
					</button>
				</form>
			</CardContent>
			<CardFooter>
				{/* Footer content can be added here if necessary */}
			</CardFooter>
		</Card>
	);
};

export default AutoLinkGenerator;
