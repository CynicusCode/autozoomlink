// utils/timeZoneUtils.js

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with required plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Mapping of timezones to their abbreviations
const timeZoneAbbreviations = {
	"America/New_York": "ET",
	"America/Chicago": "CT",
	"America/Denver": "MT",
	"America/Los_Angeles": "PT",
	"America/Anchorage": "AKT",
	"Pacific/Honolulu": "HT",
	// Add more mappings as needed
};

// Function to get timezone display name
export function getTimeZoneDisplayName(timeZone) {
	// Return direct mapping if available
	if (timeZoneAbbreviations[timeZone]) {
		return timeZoneAbbreviations[timeZone];
	}

	// Calculate UTC offset if no direct mapping
	const now = dayjs().tz(timeZone);
	const offsetMinutes = now.utcOffset();
	const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
	const sign = offsetMinutes >= 0 ? "+" : "-";

	// Format the offset
	const formattedOffset = `${sign}${offsetHours.toString().padStart(2, "0")}:${Math.abs(
		offsetMinutes % 60,
	)
		.toString()
		.padStart(2, "0")}`;

	// Return formatted offset as the display name
	return `UTC${formattedOffset}`;
}
