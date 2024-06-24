import { z } from "zod";

// Define the interface for form values
export interface FormValues {
	jobNumber?: string;
	manualTitle?: string;
	hours: string;
	minutes: string;
	language?: string;
	timeZone?: string;
	timeZoneDisplayName?: string;
	uiExpectedStartDate?: string;
	expectedStartDate?: string;
	requestorEmail?: string; // Optional
	requestorName?: string; // Optional
	isVriApproved?: boolean; // Optional
	isVirtualLabelInAddress?: boolean; // Optional
	isVriType?: boolean; // Optional
	jobStatus?: string; // Optional
	videoLinkField?: string; // Optional
}

// Define the Zod schema for form validation
export const schema = z.object({
	jobNumber: z.string().optional(),
	manualTitle: z.string().optional(),
	hours: z
		.string()
		.regex(/^(2[0-3]|[01]?[0-9])$/, "Hours must be between 00 and 23"),
	minutes: z
		.string()
		.regex(/^([0-5]?[0-9])$/, "Minutes must be between 00 and 59")
		.transform((minute) => minute.padStart(2, "0")), // Ensure minutes are always two digits
	language: z.string().optional(),
	timeZone: z.string().optional(),
	timeZoneDisplayName: z.string().optional(),
	uiExpectedStartDate: z.string().optional(), // Assuming it's a string in the format "MM/DD/YYYY hh:mm A"
	expectedStartDate: z.string().optional(), // Assuming it's an ISO string
	requestorEmail: z.string().optional(), // Optional
	requestorName: z.string().optional(), // Optional
	isVriApproved: z.boolean().optional(), // Optional
	isVirtualLabelInAddress: z.boolean().optional(), // Optional
	isVriType: z.boolean().optional(), // Optional
	jobStatus: z.string().optional(), // Optional
	videoLinkField: z.string().optional(), // Optional
});
