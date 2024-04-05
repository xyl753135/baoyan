/**
 * Converts ISO 8601 date string to YYYY-MM-DD
 * Eg. 1992-12-31T16:00:00.000Z
 * @param iso8601date 
 * @returns 
 */
export function convertISO8601DateToYYYYMMDD(iso8601date : string) {
    const date = new Date(iso8601date);
    const YYYYMMDD = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDay()).padStart(2, '0')}`
    return YYYYMMDD;
}

/**
 * Takes the Date.prototype.toISOString() output and 
 * return an object containing data parsed from the ISOString
 * ISOString Eg. "Wed Oct 05 2011 16:48:00 GMT+0200 (CEST)"
 * Returns an object {
 *   weekday
 *   month
 *   day
 *   year
 *   time
 *   timezone (eg. 'GMT+0200 (CEST)')
 * }
 * @param ISOString
 * @returns
 */
export function parseISOString(ISOString : string) {
    
    const timestampArr: Array<string> = ISOString.split(" ");
    const timestampObj = {
        weekday: timestampArr[0],
        month: parseMonth(timestampArr[1]),
        day: timestampArr[2],
        year: timestampArr[3],
        time: timestampArr[4],
        timezone: `${timestampArr[5]} ${timestampArr[6]}`,
    }
    return timestampObj;
}

/**
 * Given a short month name, return number as string
 * Eg. "Jan" -> "01"
 * Eg. "Oct" -> "10"
 * @param monthShort 
 * @returns 
 */
export function parseMonth(monthShort: string) {
    let month = "";
    switch (monthShort) {
        case "Jan":
            month = "01";
            break;
        case "Feb":
            month = "02";
            break;
        case "Mar":
            month = "03";
            break;
        case "Apr":
            month = "04";
            break;
        case "May":
            month = "05";
            break;
        case "Jun":
            month = "06";
            break;
        case "Jul":
            month = "07";
            break;
        case "Aug":
            month = "08";
            break;
        case "Sep":
            month = "09";
            break;
        case "Oct":
            month = "10";
            break;
        case "Nov":
            month = "11";
            break;
        case "Dec":
            month = "12";
            break;
        default:
            break;
    }
    return month;
}