import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

function MeetingTabs() {
	const [activeTab, setActiveTab] = useState("all"); // Declare the activeTab state variable and the setActiveTab function

	const handleTabChange = (value: string) => {
		setActiveTab(value);
		// You can add logic here to change the data in the table based on the active tab
	};

	return (
		<Tabs defaultValue="all" className=" max-w-full">
			<TabsList>
				<TabsTrigger value="all" onClick={() => handleTabChange("all")}>
					All
				</TabsTrigger>
				<TabsTrigger
					value="attention"
					onClick={() => handleTabChange("attention")}
				>
					Attention Required
				</TabsTrigger>
				<TabsTrigger
					value="custPending"
					onClick={() => handleTabChange("custPending")}
				>
					Cust. Pending
				</TabsTrigger>
				<TabsTrigger
					value="linkProvided"
					onClick={() => handleTabChange("linkProvided")}
				>
					Link Provided
				</TabsTrigger>
				<TabsTrigger
					value="demoPending"
					onClick={() => handleTabChange("demoPending")}
				>
					Demo Pending
				</TabsTrigger>
			</TabsList>
			<TabsContent value={activeTab}>
				{/* This is where the table data will be updated based on the active tab */}
			</TabsContent>
		</Tabs>
	);
}

export default MeetingTabs;
