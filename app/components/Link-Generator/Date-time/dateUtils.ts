import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const DateTimeHandler = {
	formatDateTimeForDisplay(dateTime: string, timeZone: string): string {
		const formatted = dayjs
			.utc(dateTime)
			.tz(timeZone)
			.format("MM/DD/YYYY hh:mm A");
		console.log("Formatted DateTime for Display:", formatted);
		return formatted;
	},

	convertToUtc(dateTime: string, timeZone: string): string {
		console.log("Converting dateTime to UTC:", dateTime, timeZone);
		let localDateTime: dayjs.Dayjs;
		if (dayjs(dateTime, "MM/DD/YYYY hh:mm A", true).isValid()) {
			localDateTime = dayjs.tz(dateTime, "MM/DD/YYYY hh:mm A", timeZone);
		} else {
			localDateTime = dayjs.utc(dateTime).tz(timeZone);
		}
		const utcDateTime = localDateTime.utc().format();
		console.log("Converted UTC DateTime:", utcDateTime);
		return utcDateTime;
	},

	convertToTimeZone(dateTime: string, timeZone: string): string {
		const formatted = dayjs.tz(dateTime, timeZone).format("MM/DD/YYYY hh:mm A");
		console.log("Converted to TimeZone:", formatted);
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
		console.log("Converted and Formatted for TimeZone:", formatted);
		return formatted;
	},
};
