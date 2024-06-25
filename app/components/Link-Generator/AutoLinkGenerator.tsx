"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import DateTimePicker from "./Date-time/DateTimePicker";
import FetchDetailsButton from "./FetchDetailsButton";
import JobNumberInput from "./JobNumberInput";
import { LanguageSelector } from "./LanguageSelector";
import ManualEntrySwitch from "./ManualEntryswitch";
import { schema, type FormValues } from "./formSchema";
import TimeZoneSelector from "./TimeZoneSelector/TimeZoneSelector";
import { Duration } from "./Duration";
import GenerateZoomLink from "./Zoom/GenerateZoomLink";
import ManualTitle from "./ManualTitle";
import VriType from "./VriType";
import VriLabel from "./VriLabel";
import VriApproved from "./VriApproved";
import VideoLinkField from "./VideoLinkField";
import SkeletonLoader from "../Skeleton/FormSkeleton";

const AutoLinkGenerator: React.FC = () => {
	const [jobNumber, setJobNumber] = useState("");
	const [isAutomaticMode, setIsAutomaticMode] = useState(false);
	const [isLinkGenerated, setIsLinkGenerated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const handleGenerateZoomLinkClick = () => {
		setIsLoading(true); // Set loading to true when the link generation starts
		setTimeout(() => {
			setIsLinkGenerated(true);
			// Remove the setZoomDetails and setIsPopupOpen calls
			setIsLoading(false); // Set loading to false after the link is generated
		}, 2000); // Simulate a network request
	};

	return (
		<Card className="w-[650px]">
			<CardHeader>
				<CardTitle className="flex items-center justify-center">
					Auto Zoom Link Generator
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
					{isLoading ? (
						<SkeletonLoader />
					) : (
						<>
							<ManualTitle disabled={isAutomaticMode} />
							<Duration disabled={isAutomaticMode} />
							<LanguageSelector disabled={isAutomaticMode} />
							<DateTimePicker disabled={isAutomaticMode} />
							<TimeZoneSelector disabled={isAutomaticMode} />
						</>
					)}
					<Separator />
					<div className="flex justify-evenly space-x-2">
						<VriApproved />
						<VriLabel />
						<VriType />
					</div>
					<div className="flex justify-center">
						<VideoLinkField />
					</div>
					<Separator />
					<CardFooter className="flex justify-between mt-4">
						<Button type="reset">Clear</Button>
						{isLinkGenerated && (
							<Button onClick={() => setIsLinkGenerated(false)}>
								See Invitation
							</Button>
						)}
						<GenerateZoomLink onClick={handleGenerateZoomLinkClick} />
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
