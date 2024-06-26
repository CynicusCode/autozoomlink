const data = `
America/Los_Angeles	Pacific Time (US and Canada)
America/Denver	Mountain Time (US and Canada)
America/Chicago	Central Time (US and Canada)
America/New_York	Eastern Time (US and Canada)
Pacific/Honolulu	Hawaii
America/Phoenix	Arizona
Pacific/Midway	Midway Island, Samoa
America/Anchorage	Alaska
Pacific/Pago_Pago	Pago Pago
America/Vancouver	Vancouver
America/Tijuana	Tijuana
America/Edmonton	Edmonton
America/Mazatlan	Mazatlan
America/Winnipeg	Winnipeg
America/Regina	Saskatchewan
America/Mexico_City	Mexico City
America/Guatemala	Guatemala
America/El_Salvador	El Salvador
America/Managua	Managua
America/Costa_Rica	Costa Rica
America/Montreal	Montreal
America/Indianapolis	Indiana (East)
America/Panama	Panama
America/Bogota	Bogota
America/Lima	Lima
America/Halifax	Halifax
America/Puerto_Rico	Puerto Rico
America/Caracas	Caracas
America/Santiago	Santiago
America/St_Johns	Newfoundland and Labrador
America/Montevideo	Montevideo
America/Araguaina	Brasilia
America/Argentina/Buenos_Aires	Buenos Aires, Georgetown
America/Godthab	Greenland
America/Sao_Paulo	Sao Paulo
Atlantic/Azores	Azores
Canada/Atlantic	Atlantic Time (Canada)
Atlantic/Cape_Verde	Cape Verde Islands
UTC	Universal Time UTC
Etc/Greenwich	Greenwich Mean Time
Europe/Belgrade	Belgrade, Bratislava, Ljubljana
CET	Sarajevo, Skopje, Zagreb
Atlantic/Reykjavik	Reykjavik
Europe/Dublin	Dublin
Europe/London	London
Europe/Lisbon	Lisbon
Africa/Casablanca	Casablanca
Africa/Nouakchott	Nouakchott
Europe/Oslo	Oslo
Europe/Copenhagen	Copenhagen
Europe/Brussels	Brussels
Europe/Berlin	Amsterdam, Berlin, Rome, Stockholm, Vienna
Europe/Helsinki	Helsinki
Europe/Amsterdam	Amsterdam
Europe/Rome	Rome
Europe/Stockholm	Stockholm
Europe/Vienna	Vienna
Europe/Luxembourg	Luxembourg
Europe/Paris	Paris
Europe/Zurich	Zurich
Europe/Madrid	Madrid
Africa/Bangui	West Central Africa
Africa/Algiers	Algiers
Africa/Tunis	Tunis
Africa/Harare	Harare, Pretoria
Africa/Nairobi	Nairobi
Europe/Warsaw	Warsaw
Europe/Prague	Prague Bratislava
Europe/Budapest	Budapest
Europe/Sofia	Sofia
Europe/Istanbul	Istanbul
Europe/Athens	Athens
Europe/Bucharest	Bucharest
Asia/Nicosia	Nicosia
Asia/Beirut	Beirut
Asia/Damascus	Damascus
Asia/Jerusalem	Jerusalem
Asia/Amman	Amman
Africa/Tripoli	Tripoli
Africa/Cairo	Cairo
Africa/Johannesburg	Johannesburg
Europe/Moscow	Moscow
Asia/Baghdad	Baghdad
Asia/Kuwait	Kuwait
Asia/Riyadh	Riyadh
Asia/Bahrain	Bahrain
Asia/Qatar	Qatar
Asia/Aden	Aden
Asia/Tehran	Tehran
Africa/Khartoum	Khartoum
Africa/Djibouti	Djibouti
Africa/Mogadishu	Mogadishu
Asia/Dubai	Dubai
Asia/Muscat	Muscat
Asia/Baku	Baku, Tbilisi, Yerevan
Asia/Kabul	Kabul
Asia/Yekaterinburg	Yekaterinburg
Asia/Tashkent	Islamabad, Karachi, Tashkent
Asia/Calcutta	India
Asia/Kathmandu	Kathmandu
Asia/Novosibirsk	Novosibirsk
Asia/Almaty	Almaty
Asia/Dacca	Dacca
Asia/Krasnoyarsk	Krasnoyarsk
Asia/Dhaka	Astana, Dhaka
Asia/Bangkok	Bangkok
Asia/Saigon	Vietnam
Asia/Jakarta	Jakarta
Asia/Irkutsk	Irkutsk, Ulaanbaatar
Asia/Shanghai	Beijing, Shanghai
Asia/Hong_Kong	Hong Kong
Asia/Taipei	Taipei
Asia/Kuala_Lumpur	Kuala Lumpur
Asia/Singapore	Singapore
Australia/Perth	Perth
Asia/Yakutsk	Yakutsk
Asia/Seoul	Seoul
Asia/Tokyo	Osaka, Sapporo, Tokyo
Australia/Darwin	Darwin
Australia/Adelaide	Adelaide
Asia/Vladivostok	Vladivostok
Pacific/Port_Moresby	Guam, Port Moresby
Australia/Brisbane	Brisbane
Australia/Sydney	Canberra, Melbourne, Sydney
Australia/Hobart	Hobart
Asia/Magadan	Magadan
SST	Solomon Islands
Pacific/Noumea	New Caledonia
Asia/Kamchatka	Kamchatka
Pacific/Fiji	Fiji Islands, Marshall Islands
Pacific/Auckland	Auckland, Wellington
Asia/Kolkata	Mumbai, Kolkata, New Delhi
Europe/Kiev	Kiev
America/Tegucigalpa	Tegucigalpa
Pacific/Apia	Independent State of Samoa
`;

const lines = data
	.split("\n")
	.map((line) => line.trim())
	.filter((line) => line !== "");
// Process each line to create objects with 'label' and 'value'
const timeZones = lines.map((line) => {
	const [value, label] = line.split("\t"); // Split by tab character
	return { label, value };
});
console.log(timeZones);

export default timeZones;
