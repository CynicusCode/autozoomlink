//pages/api/supabase/getAppointments.js this is the file that will be used to fetch the appointments from the Supabase database. This script will be used to fetch the appointments from the Supabase database and return them as a JSON response. The script will be used to fetch the appointments from the Supabase database and return them as a JSON response.

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const { data, error } = await supabase
				.from("Appointment")
				.select(
					"id, manualTitle, date, durationHrs, durationMins, timeZone, vriApproved, vriLabel, vriType, videoLink, requestorName, requestorEmail, createdByLLS, zoomJoinLink, vriRoomNumber",
				)
				.order("createdAt", { ascending: false });

			if (error) {
				console.error("Supabase error:", error);
				throw error;
			}

			console.log("Fetched data:", data);

			const formattedData = data.map((appointment) => ({
				id: appointment.id,
				manualTitle: appointment.manualTitle,
				date: new Date(appointment.date).toLocaleString(),
				duration: `${appointment.durationHrs}h ${appointment.durationMins}m`,
				timeZone: appointment.timeZone,
				vri: appointment.vriApproved,
				vriLabel: appointment.vriLabel,
				vriType: appointment.vriType,
				videoLink: appointment.videoLink,
			}));

			console.log("Formatted data:", formattedData);

			res.status(200).json(formattedData);
		} catch (error) {
			console.error("Error fetching appointments:", error);
			res
				.status(500)
				.json({ error: "Error fetching appointments", details: error.message });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
