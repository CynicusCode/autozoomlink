import React from "react";
import { DateTimePicker } from "@/components/ui/datetime-picker";

const DatePicker = () => {
  return (
    <div className="flex items-center gap-3">
      <p className="whitespace-nowrap">Select Date:</p>
      <DateTimePicker />
    </div>
  );
};

export default DatePicker;