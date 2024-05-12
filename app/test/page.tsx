// testPage.tsx
"use client";
import React from "react";
import DateTimePicker from "@/components/Link-Generator/Date-time/DateTimePicker";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import { CalendarIcon } from "@radix-ui/react-icons";

const Page = () => {
	return (
		<div>
			<h1>My Page</h1>
			<InputWithIcon
				label="MM/DD/YYYY HH:MM AM/PM"
				id="clientId"
				icon={<CalendarIcon />}
			/>
		</div>
	);
};

export default Page;
