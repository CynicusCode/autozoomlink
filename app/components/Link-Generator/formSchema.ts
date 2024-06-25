import { z } from "zod";

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
	requestorEmail?: string;
	requestorName?: string;
	isVriApproved?: boolean;
	isVirtualLabelInAddress?: boolean;
	isVriType?: boolean;
	jobStatus?: string;
	videoLinkField?: string;
}

export const schema = z.object({
	jobNumber: z.string().optional(),
	manualTitle: z.string().optional(),
	hours: z
		.string()
		.regex(/^(2[0-3]|[01]?[0-9])$/, "Hours must be between 00 and 23"),
	minutes: z
		.string()
		.regex(/^([0-5]?[0-9])$/, "Minutes must be between 00 and 59")
		.transform((minute) => minute.padStart(2, "0")),
	language: z.string().optional(),
	timeZone: z.string().optional(),
	timeZoneDisplayName: z.string().optional(),
	uiExpectedStartDate: z
		.string()
		.regex(
			/^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2} [AP]M$/,
			"Invalid date format",
		)
		.optional(),
	expectedStartDate: z.string().optional(),
	requestorEmail: z.string().optional(),
	requestorName: z.string().optional(),
	isVriApproved: z.boolean().optional(),
	isVirtualLabelInAddress: z.boolean().optional(),
	isVriType: z.boolean().optional(),
	jobStatus: z.string().optional(),
	videoLinkField: z.string().optional(),
});
