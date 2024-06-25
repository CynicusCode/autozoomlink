//pages/api/supabase/createAppointment.js
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
			// Calculate endDateTime based on the duration
			const startDateTime = new Date(data.date);
			const endDateTime = new Date(startDateTime);
			endDateTime.setHours(endDateTime.getHours() + data.durationHrs);
			endDateTime.setMinutes(endDateTime.getMinutes() + data.durationMins);

			// Query to find conflicting appointments
			const conflicts = await prisma.appointment.findMany({
				where: {
					AND: [
						{ date: { equals: startDateTime } },
						{
							OR: [
								{ endDateTime: { gte: startDateTime } },
								{ date: { lte: endDateTime } },
							],
						},
					],
				},
				select: {
					vriRoomNumber: true,
				},
			});

			// Find an available room number
			const maxRooms = 10; // Assume you have 10 rooms initially
			const occupiedRooms = new Set(
				conflicts.map((appointment) => appointment.vriRoomNumber),
			);
			let availableRoomNumber = null;

			for (let room = 1; room <= maxRooms; room++) {
				if (!occupiedRooms.has(room)) {
					availableRoomNumber = room;
					break;
				}
			}

			// If no room is available, assign a new room number
			if (!availableRoomNumber) {
				availableRoomNumber = maxRooms + 1;
			}

			// Create a new appointment with the assigned room number
			const appointment = await prisma.appointment.create({
				data: {
					...data,
					date: startDateTime,
					endDateTime: endDateTime,
					vriRoomNumber: availableRoomNumber,
				},
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
