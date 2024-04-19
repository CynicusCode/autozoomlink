import { useEffect, useState } from "react";

export interface AppointmentDetails {
	jobNumber: string;
	language: string;
	date: string;
	time: string;
	duration: number;
}
