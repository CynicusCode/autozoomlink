// app/meetings/MeetingTabs.tsx
"use client";

import React from "react";
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "../../components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface MeetingTabsProps {
	activeTab: string;
	onTabChange: (value: string) => void;
	counts: Record<string, number>;
}

function MeetingTabs({ activeTab, onTabChange, counts }: MeetingTabsProps) {
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
			<TabsList className="flex flex-wrap justify-center">
				<TabsTrigger value="all">
					All <Badge className="ml-1">{counts.all}</Badge>
				</TabsTrigger>
				<TabsTrigger value="linkProvided">
					Link Provided <Badge className="ml-1">{counts.linkProvided}</Badge>
				</TabsTrigger>
				<TabsTrigger value="custPending">
					Cust. Pending <Badge className="ml-1">{counts.custPending}</Badge>
				</TabsTrigger>
				<TabsTrigger value="demoPending">
					Demo Pending <Badge className="ml-1">{counts.demoPending}</Badge>
				</TabsTrigger>
				<TabsTrigger value="attention">
					Attention Required <Badge className="ml-1">{counts.attention}</Badge>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}

export default MeetingTabs;
