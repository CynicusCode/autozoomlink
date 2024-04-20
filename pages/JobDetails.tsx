// pages/JobDetails.tsx
import type { GetServerSideProps } from "next";
import type { JobDetailsTypes } from "@/types/JobDetailsTypes";

interface JobDetailsProps {
	jobDetails: JobDetailsTypes | null;
}

export default function JobDetailsPage({ jobDetails }: JobDetailsProps) {
	if (!jobDetails) {
		return <div>No job details found.</div>;
	}
}

export const getServerSideProps: GetServerSideProps<JobDetailsProps> = async (
	context,
) => {
	const { jobNumber } = context.query;

	try {
		const response = await fetch(`http://localhost:3000/api/${jobNumber}`);

		if (response.ok) {
			const data = await response.json();
			const {
				jobNumber,
				defaultLanguage,
				actualLocation,
				bookingMode,
				expectedDurationHrs,
				expectedDurationMins,
				expectedEndDate,
				expectedStartDate,
				expectedStartTime,
				requestor,
				status,
				refs,
			} = data;

			const videoLinkField =
				refs?.find((ref: any) => ref.name?.toLowerCase().includes("video link"))
					?.referenceValue || "No video link available";
			const isVirtual = actualLocation?.addrEntered?.includes("VR");

			const jobDetails: JobDetailsTypes = {
				jobNumber,
				language: defaultLanguage?.displayName || "Default Language",
				location: actualLocation?.addrEntered || "Default Location",
				appType: bookingMode?.name || "Default Booking Mode",
				locationLabel: actualLocation?.displayLabel || "Default Location Label",
				isLocationLabel: !!isVirtual,
				expectedDurationHrs,
				expectedDurationMins,
				expectedEndDate,
				expectedStartDate,
				expectedStartTime,
				notificationEmail: requestor?.email || "noemail@example.com",
				requestorName: requestor?.name || "Unknown Requestor",
				jobStatus: status?.name || "Status Unknown",
				videoLinkField,
			};

			return {
				props: {
					jobDetails,
				},
			};
		}

		console.error("Error fetching job details:", response.statusText);
	} catch (error) {
		console.error("Error fetching job details:", error);
	}

	return {
		props: {
			jobDetails: null,
		},
	};
};
