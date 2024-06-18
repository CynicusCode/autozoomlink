// app/meetings/MeetingTabs.tsx
import React from "react";
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "../../components/ui/tabs";

interface MeetingTabsProps {
	activeTab: string;
	onTabChange: (value: string) => void;
}

function MeetingTabs({ activeTab, onTabChange }: MeetingTabsProps) {
	const handleTabChange = (value: string) => {
		console.log("Tab changed to:", value);
		onTabChange(value);
	};

	return (
		<Tabs
			defaultValue={activeTab}
			value={activeTab}
			onValueChange={handleTabChange}
			className="max-w-full"
		>
			<TabsList>
				<TabsTrigger value="all">All</TabsTrigger>
				<TabsTrigger value="linkProvided">Link Provided</TabsTrigger>
				<TabsTrigger value="attention">Attention Required</TabsTrigger>
				<TabsTrigger value="custPending">Cust. Pending</TabsTrigger>
				<TabsTrigger value="demoPending">Demo Pending</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}

export default MeetingTabs;
