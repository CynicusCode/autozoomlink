//pages/api/supabase/createAppointment.js
import prisma from "../../../lib/prismaClient";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;
		console.log("Received data:", data); // Log the received data

		// Validate the request body and check for correct data types
		const requiredFields = [
			"jobNumber",
			"manualTitle",
			"date",
			"durationHrs",
			"durationMins",
			"timeZone",
		];
		const missingFields = requiredFields.filter(
			(field) => data[field] === undefined || data[field] === null,
		);

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
			endDateTime.setHours(endDateTime.getHours() + Number(data.durationHrs));
			endDateTime.setMinutes(
				endDateTime.getMinutes() + Number(data.durationMins),
			);

			console.log("Start date:", startDateTime);
			console.log("End date:", endDateTime);

			// Query to find conflicting appointments
			const conflicts = await prisma.appointment.findMany({
				where: {
					OR: [
						{ date: { lt: endDateTime }, endDateTime: { gt: startDateTime } },
						{ date: { gte: startDateTime, lt: endDateTime } },
						{ endDateTime: { gt: startDateTime, lte: endDateTime } },
					],
				},
				select: {
					vriRoomNumber: true,
				},
			});

			console.log("Conflicting appointments:", conflicts);

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

			console.log("Assigned room number:", availableRoomNumber);

			// Create a new appointment with the assigned room number and current UTC datetime
			const appointment = await prisma.appointment.create({
				data: {
					jobNumber: data.jobNumber,
					manualTitle: data.manualTitle,
					date: startDateTime,
					time: data.time ? new Date(data.time) : null,
					endDateTime: endDateTime,
					durationHrs: Number(data.durationHrs),
					durationMins: Number(data.durationMins),
					timeZone: data.timeZone,
					timeZoneDisplayName: data.timeZoneDisplayName || null,
					vriRoomNumber: availableRoomNumber,
					createdAt: new Date().toISOString(),
					createdByLLS: true, // Set this to true as required
					requestorEmail: data.requestorEmail || null,
					requestorName: data.requestorName || null,
					status: data.status || null,
					videoLink: data.videoLink || null,
					videoLinkField: data.videoLinkField || null,
					vriApproved: data.vriApproved === true,
					vriLabel: data.vriLabel === true,
					vriType: data.vriType === true,
					zoomInvitation: data.zoomInvitation || null,
					zoomJoinLink: data.zoomJoinLink || null,
					zoomMeetingId: data.zoomMeetingId || null,
					zoomStartLink: data.zoomStartLink || null,
				},
			});

			console.log(
				`Appointment created successfully. Room number: ${availableRoomNumber}`,
			);
			console.log("Created appointment:", appointment); // Log the created appointment
			res.status(200).json(appointment);
		} catch (error) {
			console.error("Error creating appointment:", error);
			console.error("Error details:", JSON.stringify(error, null, 2)); // Log detailed error information
			res
				.status(500)
				.json({ error: "Error creating appointment", details: error.message });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
