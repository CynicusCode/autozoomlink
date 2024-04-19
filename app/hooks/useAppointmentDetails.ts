// useAppointmentDetails.ts
import { useState, useEffect } from "react";

export interface AppointmentDetails {
	jobNumber: string;
	language: string;
	location: string;
	appType: string;
	locationLabel: string;
	isLocationLabel: boolean;
	expectedDurationHrs: number;
	expectedDurationMins: number;
	expectedEndDate: string;
	expectedStartDate: string;
	expectedStartTime: string;
	notificationEmail: string;
	requestorName: string;
	jobStatus: string;
	videoLinkField: string;
}

export function useAppointmentDetails(
	jobNumber: string,
): AppointmentDetails | null {
	const [appointmentDetails, setAppointmentDetails] =
		useState<AppointmentDetails | null>(null);

	useEffect(() => {
		const fetchAppointmentDetails = async () => {
			try {
				const response = await fetch(`/api/appointments/${jobNumber}`);
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
						ref
					} = data;


					const isVirtual = actualLocation.addrEntered.includes("VR");
					const videoLinkField = refs.find((ref: any) => 
    ref.name?.toLowerCase().includes("video link".toLowerCase())
)?.referenceValue || "No video link available";


					setAppointmentDetails({
						jobNumber,
						language: defaultLanguage.displayName,
						location: actualLocation.addrEntered,
						appType: bookingMode.name,
						locationLabel: actualLocation.displayLabel,
						isLocationLabel: isVirtual,
						expectedDurationHrs,
						expectedDurationMins,
						expectedEndDate,
						expectedStartDate,
						expectedStartTime,
						notificationEmail: requestor.email,
						requestorName: requestor.name,
						jobStatus: status.name,
                        videoLinkField:
					});
				} else {
					console.error(
						"Error fetching appointment details:",
						response.statusText,
					);
				}
			} catch (error) {
				console.error("Error fetching appointment details:", error);
			}
		};

		if (jobNumber) {
			fetchAppointmentDetails();
		}
	}, [jobNumber]);

	return appointmentDetails;
}
