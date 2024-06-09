// types/jobDetails.ts
export interface JobDetails {
	jobNumber: string;
	language: string;
	isVriType: boolean;
	isVirtualLabelInAddress: boolean;
	isVriApproved: boolean;
	expectedDurationHrs: number;
	expectedDurationMins: number;
	expectedStartDate: string;
	uiExpectedStartDate: string;
	expectedStartTime: string;
	timeZone: string;
	timeZoneDisplayName: string;
	requestorEmail: string;
	requestorName: string;
	jobStatus: string;
	videoLinkField: string;
}
