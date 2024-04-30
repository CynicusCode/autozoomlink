import React from "react";
import { DateTimePicker } from "@/components/Link-Generator/Date-time/DateTimePicker";

const DatetimePickerForm = () => {
	return (
		<div className="items-center justify-center max-w-lg">
			<DateTimePicker granularity="minute" />
		</div>
	);
};

export default DatetimePickerForm;
