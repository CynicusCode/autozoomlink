import prisma from "../../../lib/prismaClient";

export default async function handler(req, res) {
	if (req.method === "POST") {
		console.log("Received POST request to create appointment");
		const data = req.body;
		console.log("Received data:", JSON.stringify(data, null, 2));

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
			console.log("Calculating start and end date/time");
			const startDateTime = new Date(data.date);
			const endDateTime = new Date(startDateTime);
			endDateTime.setHours(endDateTime.getHours() + Number(data.durationHrs));
			endDateTime.setMinutes(
				endDateTime.getMinutes() + Number(data.durationMins),
			);

			console.log("Start date:", startDateTime.toISOString());
			console.log("End date:", endDateTime.toISOString());

			console.log("Querying for conflicting appointments");
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

			const maxRooms = 10;
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

			if (!availableRoomNumber) {
				availableRoomNumber = maxRooms + 1;
			}

			console.log("Assigned room#:", availableRoomNumber);

			console.log("Creating new appointment");
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
					createdByLLS: true,
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
			console.log("Created appointment:", JSON.stringify(appointment, null, 2));
			res.status(200).json(appointment);
		} catch (error) {
			console.error("Error creating appointment:", error);
			console.error("Error name:", error.name);
			console.error("Error message:", error.message);
			console.error("Error stack:", error.stack);

			if (error instanceof prisma.PrismaClientKnownRequestError) {
				console.error("Prisma error code:", error.code);
				console.error("Prisma error meta:", error.meta);
			}

			res.status(500).json({
				error: "Error creating appointment",
				details: error.message,
				name: error.name,
				stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
			});
		}
	} else {
		console.error(`Method ${req.method} not allowed`);
		res.status(405).json({ error: "Method not allowed" });
	}
}
