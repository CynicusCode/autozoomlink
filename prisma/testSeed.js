//testSeed.js is a script that seeds the database with test data.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new appointment with a third-party video link
const appointment = await prisma.appointment.create({
	data: {
		jobNumber: 1234567,
		date: new Date("2024-04-05"),
		time: new Date("2024-04-05T10:00:00"),
		durationHrs: 2,
		durationMins: 30,
		address: "123 Main St, City, State",
		timeZone: "America/New_York",
		vriApproved: true,
		videoScheduled: true,
		status: "Scheduled",
		VideoLink: "https://example.com/video-link",
	},
});
