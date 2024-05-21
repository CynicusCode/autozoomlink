// dateUtils.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

/**
 * Convert a date-time string to UTC format based on the provided time zone.
 * @param dateTime - The date-time string to be converted.
 * @param timeZone - The time zone in which the date-time is specified.
 * @returns The UTC date-time string.
 */
export const convertToUtc = (dateTime: string, timeZone: string): string => {
	const format = "MM/DD/YYYY hh:mm A"; // Ensure this matches your input format
	const utcDate = dayjs.tz(dateTime, format, timeZone).utc();
	console.log("Converted UTC date:", utcDate.toISOString()); // Log the converted UTC date for debugging
	return utcDate.toISOString();
};
