// pages/api/zoom/createAppointment.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const data = req.body;
			const appointment = await prisma.appointment.create({
				data,
			});
			res.status(200).json(appointment);
		} catch (error) {
			console.error("Error creating appointment:", error);
			res.status(500).json({ error: "Error creating appointment" });
		}
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
}
