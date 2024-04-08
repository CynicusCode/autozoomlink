// ManualEntrySwitch.tsx
"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ManualEntrySwitch() {
	const [isManualEntry, setIsManualEntry] = React.useState(false);

	const handleManualEntryToggle = () => {
		setIsManualEntry((prevState) => !prevState);
	};

	return (
		<div className="flex items-center justify-center space-x-2">
			<Label htmlFor="manualEntry">Enter Details Manually</Label>
			<Switch
				id="manualEntry"
				checked={isManualEntry}
				onCheckedChange={handleManualEntryToggle}
			/>
		</div>
	);
}
