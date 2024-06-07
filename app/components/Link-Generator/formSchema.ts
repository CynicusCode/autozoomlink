// formSchema.ts
import { z } from "zod";

// Define the interface for form values
export interface FormValues {
	jobNumber: string;
	manualTitle?: string;
	hours: string;
	minutes: string;
	language?: string;
	timeZone?: string;
	expectedStartDate?: string;
}

// Define the Zod schema for form validation
export const schema = z.object({
	jobNumber: z
		.string()
		.min(1, "Job number is required")
		.regex(/^\d{5}$/, "Job number must be exactly 5 digits"),
	manualTitle: z.string().optional(),
	hours: z
		.string()
		.regex(/^(2[0-3]|[01]?[0-9])$/, "Hours must be between 00 and 23"),
	minutes: z
		.string()
		.regex(/^([0-5]?[0-9])$/, "Minutes must be between 00 and 59")
		.transform((minute) => minute.padStart(2, "0")), // Ensure minutes are always two digits
});
