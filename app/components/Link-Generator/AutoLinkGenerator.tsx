// app/components/Link-Generator/AutoLinkGenerator.tsx
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
import { Badge } from "../../../components/ui/badge";
import DateTimePicker from "./Date-time/DateTimePicker";
import FetchDetailsButton from "./FetchDetailsButton";
import JobNumberInput from "./JobNumberInput";
import { LanguageSelector } from "./LanguageSelector";
import ManualEntrySwitch from "./ManualEntryswitch";
import { schema, type FormValues } from "./formSchema";
import { Separator } from "../../../components/ui/separator";
import TimeZoneSelector from "./TimeZoneSelector/TimeZoneSelector";
import { Duration } from "./Duration";
import GenerateZoomLink from "./Zoom/GenerateZoomLink";
import ManualTitle from "./ManualTitle";
import VriType from "./VriType";
import VriLabel from "./VriLabel";
import VriApproved from "./VriApproved";
import VideoLinkField from "./VideoLinkField";
import ZoomLinkPopup from "./Zoom/ZoomLinkPopup";

const AutoLinkGenerator: React.FC = () => {
	const [jobNumber, setJobNumber] = useState("");
	const [isAutomaticMode, setIsAutomaticMode] = useState(false);
	const [isLinkGenerated, setIsLinkGenerated] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [zoomDetails, setZoomDetails] = useState({
		title: "",
		time: "",
		joinLink: "",
		meetingId: "",
		passcode: "",
		requestorEmail: "",
	});

	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const handleGenerateZoomLinkClick = () => {
		setIsLinkGenerated(true);
		setIsPopupOpen(true); // Open the popup when the link is generated

		// For demonstration purposes, set the zoomDetails object with mock data
		setZoomDetails({
			title: "Demo Meeting",
			time: "January 1, 2024 10:00 AM",
			joinLink: "https://example.com/zoom-link",
			meetingId: "123456789",
			passcode: "passcode123",
			requestorEmail: "requestor@example.com",
		});
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
					<ManualTitle disabled={isAutomaticMode} />
					<Duration disabled={isAutomaticMode} />
					<LanguageSelector disabled={isAutomaticMode} />
					<DateTimePicker disabled={isAutomaticMode} />
					<TimeZoneSelector disabled={isAutomaticMode} />
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
							<Button onClick={() => setIsPopupOpen(true)}>
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
			<ZoomLinkPopup
				isOpen={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				zoomDetails={zoomDetails}
			/>
		</Card>
	);
};

export default AutoLinkGenerator;
