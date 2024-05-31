import prisma from "../../../lib/prismaClient";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;

		console.log("Received data:", data); // Log the received data

		// Validate the request body and check for correct data types
		const missingFields = [];
		if (!data.jobNumber) missingFields.push("jobNumber");
		if (!data.manualTitle) missingFields.push("manualTitle");
		if (!data.date) missingFields.push("date");
		if (data.durationHrs === undefined || data.durationHrs === null)
			missingFields.push("durationHrs");
		if (data.durationMins === undefined || data.durationMins === null)
			missingFields.push("durationMins");
		if (!data.endDateTime) missingFields.push("endDateTime");
		if (!data.timeZone) missingFields.push("timeZone");

		if (missingFields.length > 0) {
			console.error("Missing required fields:", missingFields);
			return res
				.status(400)
				.json({ error: "Missing required fields", missingFields });
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
