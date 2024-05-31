import prisma from "../../../lib/prismaClient";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;

		// Validate the request body
		if (
			!data.jobNumber ||
			!data.manualTitle ||
			!data.date ||
			!data.durationHrs ||
			!data.durationMins ||
			!data.endDateTime ||
			!data.timeZone
		) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		try {
			const appointment = await prisma.appointment.create({
				data,
			});
			res.status(200).json(appointment);
		} catch (error) {
			console.error("Error creating appointment:", error);
			res
				.status(500)
				.json({ error: "Error creating appointment", details: error.message });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
