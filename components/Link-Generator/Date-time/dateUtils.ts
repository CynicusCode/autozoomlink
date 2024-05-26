import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const DateTimeHandler = {
	formatDateTimeForDisplay(dateTime: string, timeZone: string): string {
		// Log the inputs
		console.log(
			`formatDateTimeForDisplay - dateTime: ${dateTime}, timeZone: ${timeZone}`,
		);
		const formatted = dayjs
			.utc(dateTime)
			.tz(timeZone)
			.format("MM/DD/YYYY hh:mm A");
		console.log(`Formatted date-time for display: ${formatted}`);
		return formatted;
	},

	convertToUtc(dateTime: string, timeZone: string): string {
		// Log the inputs
		console.log(`convertToUtc - dateTime: ${dateTime}, timeZone: ${timeZone}`);
		const localDateTime = dayjs.tz(dateTime, "MM/DD/YYYY hh:mm A", timeZone);
		console.log(`Local date-time: ${localDateTime.format()}`);
		const utcDateTime = localDateTime.utc().format();
		console.log(`UTC date-time: ${utcDateTime}`);
		return utcDateTime;
	},

	convertToTimeZone(dateTime: string, timeZone: string): string {
		const formatted = dayjs.tz(dateTime, timeZone).format("MM/DD/YYYY hh:mm A");
		console.log(
			`convertToTimeZone - dateTime: ${dateTime}, timeZone: ${timeZone}, result: ${formatted}`,
		);
		return formatted;
	},

	convertAndFormatForTimeZone(
		dateTime: string,
		sourceTimeZone: string,
		targetTimeZone: string,
	): string {
		const formatted = dayjs
			.tz(dateTime, sourceTimeZone)
			.tz(targetTimeZone)
			.format("MM/DD/YYYY hh:mm A");
		console.log(
			`convertAndFormatForTimeZone - dateTime: ${dateTime}, sourceTimeZone: ${sourceTimeZone}, targetTimeZone: ${targetTimeZone}, result: ${formatted}`,
		);
		return formatted;
	},
};
