// LinkGenerator.tsx
import * as React from "react";
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

export function LinkGenerator() {
	return (
		<Card className="w-[650px]">
			<CardHeader>
				<CardTitle className="flex items-center justify-center">
					Auto Link Generator
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form>
					<div className="grid w-full items-center gap-4">
						<JobNumberInput />
						<FetchDetailsButton />
						<ManualEntrySwitch />
						<Separator />
						<ManualTitle />
						<LanguageSelector />
						<div className="flex space-x-4">
							<DatePicker />
							<TimeInput />
						</div>
						<Duration />
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline">Clear</Button>
				<Button>Generate Link</Button>
			</CardFooter>
		</Card>
	);
}
