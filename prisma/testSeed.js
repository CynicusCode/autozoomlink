import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debug line

const prisma = new PrismaClient();

async function testConnection() {
	try {
		// Test the connection by querying the database for the first 1 record from any table, e.g., the Appointment table
		await prisma.$queryRaw`SELECT 1`;
		console.log("Database connection successful!");
	} catch (error) {
		console.error("Database connection failed:", error);
	} finally {
		await prisma.$disconnect();
	}
}

testConnection();
