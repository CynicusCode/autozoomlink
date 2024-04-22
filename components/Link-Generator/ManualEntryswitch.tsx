// ManualEntrySwitch.tsx
"use client";

import type * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ManualEntrySwitch({
	isAutomaticMode,
	setIsAutomaticMode,
}: {
	isAutomaticMode: boolean;
	setIsAutomaticMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const handleManualEntryToggle = () => {
		setIsAutomaticMode(false);
	};

	return (
		<div className="flex items-center justify-center space-x-2">
			<Label htmlFor="manualEntry">Enter Details Manually</Label>
			<Switch
				id="manualEntry"
				checked={!isAutomaticMode}
				onCheckedChange={handleManualEntryToggle}
			/>
		</div>
	);
}
