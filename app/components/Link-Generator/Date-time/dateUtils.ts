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
		return formatted;
	},

	convertToUtc(dateTime: string, timeZone: string): string {
		let localDateTime: dayjs.Dayjs;
		if (dayjs(dateTime, "MM/DD/YYYY hh:mm A", true).isValid()) {
			// Assuming dateTime is in the local time zone format "MM/DD/YYYY hh:mm A"
			localDateTime = dayjs.tz(dateTime, "MM/DD/YYYY hh:mm A", timeZone);
		} else {
			// Assuming dateTime is in a well-formed ISO format
			localDateTime = dayjs.utc(dateTime).tz(timeZone);
		}
		const utcDateTime = localDateTime.utc().format();
		return utcDateTime;
	},

	convertToTimeZone(dateTime: string, timeZone: string): string {
		const formatted = dayjs.tz(dateTime, timeZone).format("MM/DD/YYYY hh:mm A");
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
		return formatted;
	},
};
