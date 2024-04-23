// Importing necessary libraries and modules
import { faker } from "@faker-js/faker"; // Faker library for generating fake data
import originalData from "./apitemplate.json" assert { type: "json" }; // Importing a JSON template for API calls
import dayjs from "dayjs"; // Day.js library for handling dates and times
import fs from "node:fs"; // Node.js File System module for file operations
import path from "node:path"; // Node.js Path module for handling file paths
import { fileURLToPath } from "node:url"; // Node.js URL module to convert URL to path

/**
 * Function to replace specific values within an array of references with dynamically generated links.
 * @param {Array} refs - An array of reference objects where each object contains a name and ref fields.
 */
function replaceValues(refs) {
	for (const ref of refs) {
		if (ref.name === "3rd Party Video Link") {
			const generatedLink = generateLink();
			ref.ref = generatedLink;
			ref.referenceValue = generatedLink;
		}
	}
}

/**
 * Returns a random US time zone from a predefined list.
 * @return {Object} An object containing the name and displayName of the time zone.
 */
function getRandomUSTimeZone() {
	const timeZones = [
		{ name: "America/New_York", displayName: "EDT" },
		{ name: "America/Chicago", displayName: "CDT" },
		{ name: "America/Denver", displayName: "MDT" },
		{ name: "America/Los_Angeles", displayName: "PDT" },
	];
	return faker.helpers.arrayElement(timeZones);
}

/**
 * Generates a random appointment duration, weighted towards common durations.
 * @return {Object} An object containing duration in minutes and hours.
 */
function getRandomDuration() {
	const randomNumber = faker.number.int({ min: 1, max: 100 });
	const durationMins =
		randomNumber <= 10
			? 30
			: // 30 minutes with 10% chance
				randomNumber <= 35
				? 60
				: // 1 hour with 25% chance
					randomNumber <= 60
					? 90
					: // 1.5 hours with 25% chance
						randomNumber <= 75
						? 120
						: // 2 hours with 15% chance
							randomNumber <= 85
							? 150
							: // 2.5 hours with 10% chance
								randomNumber <= 90
								? 180
								: // 3 hours with 5% chance
									240; // 4 hours with 10% chance
	const durationHrs = durationMins / 60;
	return { durationMins, durationHrs };
}

/**
 * Randomly generates a video link string based on predefined probabilities.
 * @return {String} A string representing a video link.
 */
function generateLink() {
	const randomNumber = faker.number.int({ min: 1, max: 100 });
	return randomNumber <= 40
		? "Demo generate link"
		: randomNumber <= 60
			? "Customer will provide link"
			: "http://customer.generated.link";
}

/**
 * Randomly selects a job status based on predefined probabilities.
 * @return {String} The selected job status.
 */
function getRandomJobStatus() {
	const randomNumber = faker.number.int({ min: 1, max: 100 });
	return randomNumber <= 20
		? "Open"
		: randomNumber <= 40
			? "Offered"
			: randomNumber <= 50
				? "Assign"
				: randomNumber <= 95
					? "Confirm"
					: "Cancelled";
}

/**
 * Generates a fake API call object by modifying a template with random data.
 * @param {Number} id - The identifier for the API call.
 * @return {Object} The modified API call object filled with fake data.
 */
function generateAPICall(id) {
	const apiCall = JSON.parse(JSON.stringify(originalData)); // Deep clone the original API data template
	// Set basic properties
	apiCall.id = id;
	apiCall.uri = `https://osi.demo.com:443/api/booking/${id}`;

	// Generate and format location data
	const fakeAddress = {
		street: faker.location.streetAddress(),
		city: faker.location.city(),
		state: faker.location.state(),
		zipCode: faker.location.zipCode(),
		country: "United States",
		countryCode: "US",
	};
	const formattedAddress = `${fakeAddress.street}, ${fakeAddress.city}, ${fakeAddress.state} ${fakeAddress.zipCode}`;
	const fakeCompanyName = faker.company.name();
	const { durationMins, durationHrs } = getRandomDuration();

	// Populate the API call object with fake data
	apiCall.actualLocation.addrEntered = formattedAddress;
	apiCall.location.addrEntered = formattedAddress;
	apiCall.billingLocation.addrEntered = formattedAddress;
	apiCall.billingLocation.displayLabel = formattedAddress;
	apiCall.actualLocation.displayLabel = `Virtual Session (VRI)\\n${formattedAddress}`;
	apiCall.client.displayName = fakeCompanyName;
	apiCall.client.name = fakeCompanyName;
	apiCall.notificationEmail = faker.internet.email();
	apiCall.requestor.displayLabel = `${faker.person.fullName()} ${faker.phone.number()}`;
	apiCall.timeZone = getRandomUSTimeZone().name;
	apiCall.timeZoneDisplayName = getRandomUSTimeZone().displayName;
	apiCall.visit.status.name = getRandomJobStatus();
	apiCall.visit.status.nameKey = apiCall.visit.status.name.toLowerCase();
	apiCall.expectedDurationMins = durationMins;
	apiCall.expectedDurationHrs = durationHrs;
	replaceValues(apiCall.refs);

	// Generate and set date/time details
	const startDate = faker.date.between(
		"2024-05-06T00:00:00.000Z",
		"2024-05-10T23:59:59.999Z",
	);
	startDate.setUTCHours(faker.number.int({ min: 15, max: 22 }), 0, 0, 0);
	const formattedStartDate = startDate.toISOString().replace(".000Z", "Z");
	apiCall.expectedStartDate = formattedStartDate;
	apiCall.expectedStartTime = formattedStartDate;
	apiCall.expectedEndDate = dayjs(formattedStartDate)
		.add(durationMins, "minute")
		.toISOString()
		.replace(".000Z", "Z");

	return apiCall;
}

// Main script execution logic to generate mock API calls
const numAPICalls = 40; // Number of API calls to generate
const startingId = 10000; // Starting ID for API calls
const generatedAPICalls = []; // Array to hold generated API calls

// Set directory paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fakeDataDir = path.join(__dirname, "mockdata", "api");

// Ensure directory exists, create if not
if (!fs.existsSync(fakeDataDir)) {
	fs.mkdirSync(fakeDataDir, { recursive: true });
}

// Generate and save API call data to files
for (let i = 0; i < numAPICalls; i++) {
	const id = startingId + i;
	const apiCall = generateAPICall(id);
	const jsonData = JSON.stringify(apiCall, null, 2);
	const fileName = `${id}.json`;
	const filePath = path.join(fakeDataDir, fileName);
	fs.writeFileSync(filePath, jsonData);
	console.log(`Generated data written to ${filePath}`);
}
