// testSeed.js is a script that seeds the database with test data.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Create a new appointment with a third-party video link
	const appointment = await prisma.appointment.create({
		data: {
			jobNumber: 12345,
			date: new Date("2024-05-24"),
			time: new Date("2024-05-24T10:00:00"),
			durationHrs: 2,
			durationMins: 30,
			timeZone: "America/New_York",
			vriApproved: true,
			vriLabel: false,
			vriType: true,
			status: "Scheduled",
			videoLink: "https://example.com/video-link",
			requestorName: "John Doe",
			requestorEmail: "john.doe@example.com",
			createdByLLS: true,
			zoomMeetingId: null,
			zoomStartLink: null,
			zoomJoinLink: null,
			zoomInvitation: null,
			vriRoomNumber: null,
		},
	});

	console.log("Seeded appointment:", appointment);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
