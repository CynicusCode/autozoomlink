import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const allAppointments = await prisma.appointment.findMany();
	console.log(allAppointments);
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
