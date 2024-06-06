import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const { data, error } = await supabase
				.from("Appointment")
				.select(
					"id, manualTitle, date, durationHrs, durationMins, timeZone, vriApproved, videoLink",
				)
				.order("createdAt", { ascending: false });

			if (error) {
				throw error;
			}

			const formattedData = data.map((appointment) => ({
				id: appointment.id,
				manualTitle: appointment.manualTitle,
				date: new Date(appointment.date).toLocaleString(),
				duration: `${appointment.durationHrs}h ${appointment.durationMins}m`,
				timeZone: appointment.timeZone,
				vri: appointment.vriApproved,
				videoLink: appointment.videoLink,
			}));

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
