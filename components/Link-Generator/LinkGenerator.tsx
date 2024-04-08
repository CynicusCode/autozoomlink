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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FloatingLabelInput } from "../ui/floatinginput";
import JobNumberInput from "./JobNumberInput";
import FetchDetailsButton from "./FetchDetailsButton";
import ManualEntrySwitch from "./ManualEntrySwitch";
import { Separator } from "../ui/separator";

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
						{/* Additional form fields for Title, Date, Time, Duration, Time Zone, Video Link */}
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
