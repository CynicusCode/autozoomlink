import DatePickerAndTimePicker from "@/components/Link-Generator/Datepicker";
import { Navbar } from "@/components/shared/Navbar";
import React from "react";

const NavegationBar = () => {
	return (
		<div className="flex justify-center items-center">
			<Navbar />
			<div className="mt-64">


			<DatePickerAndTimePicker />
			</div>
		</div>
	);
};

export default NavegationBar;
