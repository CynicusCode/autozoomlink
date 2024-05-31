import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { v4 as uuidv4 } from "uuid";

dayjs.extend(utc);
dayjs.extend(timezone);

const prisma = new PrismaClient();

async function main() {
	const testData = [
		{
			jobNumber: uuidv4(),
			manualTitle: "Test Appointment 1",
			date: dayjs
				.tz("2024-06-01 10:00 AM", "America/Los_Angeles")
				.toISOString(),
			durationHrs: 1,
			durationMins: 30,
			endDateTime: dayjs
				.tz("2024-06-01 10:00 AM", "America/Los_Angeles")
				.add(1, "hour")
				.add(30, "minute")
				.utc()
				.toISOString(),
			timeZone: "America/Los_Angeles",
			vriApproved: true,
			vriLabel: true,
			vriType: true,
			status: "Scheduled",
			videoLink: "https://zoom.us/j/1234567890",
			requestorName: "John Doe",
			requestorEmail: "john.doe@example.com",
			createdByLLS: true,
			zoomMeetingId: "1234567890",
			zoomStartLink: "https://zoom.us/s/1234567890",
			zoomJoinLink: "https://zoom.us/j/1234567890",
			zoomInvitation: "123456",
			vriRoomNumber: 1,
		},
		{
			jobNumber: uuidv4(),
			manualTitle: "Test Appointment 2",
			date: dayjs.tz("2024-06-02 11:00 AM", "America/New_York").toISOString(),
			durationHrs: 2,
			durationMins: 0,
			endDateTime: dayjs
				.tz("2024-06-02 11:00 AM", "America/New_York")
				.add(2, "hour")
				.utc()
				.toISOString(),
			timeZone: "America/New_York",
			vriApproved: false,
			vriLabel: false,
			vriType: false,
			status: "Completed",
			videoLink: "https://zoom.us/j/0987654321",
			requestorName: "Jane Smith",
			requestorEmail: "jane.smith@example.com",
			createdByLLS: true,
			zoomMeetingId: "0987654321",
			zoomStartLink: "https://zoom.us/s/0987654321",
			zoomJoinLink: "https://zoom.us/j/0987654321",
			zoomInvitation: "654321",
			vriRoomNumber: 2,
		},
	];

	for (const data of testData) {
		await prisma.appointment.create({
			data,
		});
	}

	console.log("Database seeded with test data");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
