"use client";
import DateTimePicker from "@/components/Link-Generator/Date-time/DateTimePicker";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

const Page = () => {
	return (
		<div>
			<h1>My Page</h1>
			<DateTimePicker />
			<Calendar />
		</div>
	);
};

export default Page;
