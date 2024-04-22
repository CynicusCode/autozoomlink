//AutoLinkGenerator.tsx
"use client";
import type React from "react";
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
	CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import JobNumberInput from "./JobNumberInput";
import FetchDetailsButton from "./FetchDetailsButton";

const AutoLinkGenerator: React.FC = () => {
	const [jobNumber, setJobNumber] = useState("");

	return (
		<Card className="w-[650px]">
			<CardHeader>
				<CardTitle className="flex items-center justify-center">
					Auto Link Generator
				</CardTitle>
			</CardHeader>
			<CardContent>
				<JobNumberInput jobNumber={jobNumber} setJobNumber={setJobNumber} />
				<FetchDetailsButton jobNumber={jobNumber} />
			</CardContent>
			//TODO add skeleton once the form is completed
			<CardFooter>{/* Footer content goes here */}</CardFooter>
		</Card>
	);
};

export default AutoLinkGenerator;
