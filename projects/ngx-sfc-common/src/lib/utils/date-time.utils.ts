import { formatDate } from "@angular/common";
import { DateTimeConstants } from "../constants";
import { isDefined } from "./common.utils";

/**
 * Set minutes for date
 * @param date Date value
 * @param minute Minute value
 * @returns Date with minute value
 */
export function setMinutes(date: Date, minute: number): Date {
    const result = new Date(date);
    result.setMinutes(minute);
    return result;
}

/**
 * Set hours for date
 * @param date Date value
 * @param hour Hour value
 * @returns Date with hour value
 */
export function setHours(date: Date, hour: number): Date {
    const result = new Date(date);
    result.setHours(hour);
    return result;
}

/**
 * Set day for date value
 * @param date Date value
 * @param dayNumber Day number 
 * @returns Date with day number
 */
export function setDay(date: Date, dayNumber: number): Date {
    const nextDate = new Date(date);
    nextDate.setDate(dayNumber);
    return nextDate;
}

/**
 * Set year for date
 * @param date Date value
 * @param year Year value
 * @returns Date with year value
 */
export function setYear(date: Date, year: number): Date {
    const result = new Date(date);
    result.setFullYear(year);
    return result;
}

/**
 * Set seconds for date
 * @param date Date value
 * @param value Seconds value
 * @returns Date with minute value
 */
export function setSeconds(date: Date, value: number): Date {
    const result = new Date(date);
    result.setSeconds(value);
    return result;
}

/**
 * Set milliseconds for date
 * @param date Date value
 * @param value Milliseconds value
 * @returns Date with minute value
 */
export function setMilliseconds(date: Date, value: number): Date {
    const result = new Date(date);
    result.setMilliseconds(value);
    return result;
}

/**
 * Set 0 for seconds and milliseconds of date
 * @param date Date value
 * @returns Date with minute value
 */
export function setDefaultSecondsAndMiliseconds(date: Date): Date {
    const result = new Date(date);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
}

/**
 * Get next date
 * @param date Date value
 * @returns Next date
 */
export function getNextDate(date: Date): Date {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1)
    return nextDate;
}

/**
 * Get previous date
 * @param date Date value
 * @returns Previous date
 */
export function getPreviousDate(date: Date): Date {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() - 1)
    return nextDate;
}

/**
 * Get next month as date
 * @param date Date value
 * @returns Next month as date
 */
export function getNextMonth(date: Date): Date {
    const nextMonth = new Date(date);
    nextMonth.setMonth(date.getMonth() + 1)
    return nextMonth;
}

/**
 * Get previous month as date
 * @param date Date value
 * @returns Previous month as date
 */
export function getPreviousMonth(date: Date): Date {
    const prevMonth = new Date(date);
    prevMonth.setMonth(date.getMonth() - 1);
    return prevMonth;
}

/**
 * Get next year as date
 * @param date Date value
 * @returns Next year as date
 */
export function getNextYear(date: Date): Date {
    const nextYear = new Date(date);
    nextYear.setFullYear(date.getFullYear() + 1);
    return nextYear;
}

/**
 * Get previous year as date
 * @param date Date value
 * @returns Previous year as date
 */
export function getPreviousYear(date: Date): Date {
    const prevYear = new Date(date);
    prevYear.setFullYear(date.getFullYear() - 1);
    return prevYear;
}

/**
 * Return first day of month as date from date value
 * @param date Date value
 * @returns First day of month as date
 */
export function getFirstDayOfMonth(date: Date): Date {
    if (isDefined(date) && date instanceof Date) {
        const year = date.getFullYear(),
            month = date.getMonth();
        return new Date(year, month, 1);
    }

    return date;
}

/**
 * Return last day of month as date from date value
 * @param date Date value
 * @returns Last day of month as date
 */
export function getLastDayOfMonth(date: Date): Date {
    if (isDefined(date) && date instanceof Date) {
        const year = date.getFullYear(),
            month = date.getMonth();
        return new Date(year, month + 1, 0);
    }

    return date;
}

/**
 * Return first day of year as date from date value
 * @param date Date value
 * @returns First day of year as date
 */
export function getFirstDayOfYear(date: Date): Date {
    if (isDefined(date) && date instanceof Date) {
        return new Date(date.getFullYear(), 0, 1);
    }

    return date;
}

/**
 * Return last day of year as date from date value
 * @param date Date value
 * @returns Last day of year as date
 */
export function getLastDayOfYear(date: Date): Date {
    if (isDefined(date) && date instanceof Date) {
        return new Date(date.getFullYear(), 12, 0);
    }

    return date;
}

/**
 * Return first day of month as date
 * @param year Year value
 * @param month Month value
 * @returns First day of month
 */
export function getFirstDayOfMonthByYearAndMonth(year: number, month: number): Date {
    return new Date(year, month, 1);
}

/**
 * Return last day of month as date
 * @param year Year value
 * @param month Month value
 * @returns Last day of month
 */
export function getLastDayOfMonthByYearAndMonth(year: number, month: number): Date {
    return new Date(year, month + 1, 0);
}

/**
 * Return week number in month from date value
 * @param date Date value
 * @returns Week number
 */
export function getWeeksNumberInMonth(date: Date): number {
    const firstOfMonth = getFirstDayOfMonth(date),
        lastOfMonth = getLastDayOfMonth(date),
        used = firstOfMonth.getDay() + lastOfMonth.getDate();
    return Math.ceil(used / DateTimeConstants.DAYS_IN_WEEK);
}

/**
 * Return true if first and second date are equal
 * @param date1 First date value
 * @param date2 Second date value
 * @returns True if first and second date are equal
 */
export function isEqualDates(date1: Date, date2: Date): boolean {
    const date1Value = new Date(date1),
        date2Value = new Date(date2);
    date1Value.setHours(0, 0, 0, 0);
    date2Value.setHours(0, 0, 0, 0);

    return date1Value.getTime() === date2Value.getTime();
}

/**
 * Return true if first and second datetime are equal
 * @param date1 First datetime value
 * @param date2 Second datetime value
 * @returns True if first and second datetime are equal
 */
export function isEqualDateTimes(date1: Date, date2: Date): boolean {
    const date1Value = new Date(date1),
        date2Value = new Date(date2);

    return date1Value.getTime() === date2Value.getTime();
}

/**
 * Return true if first date greater than second date
 * @param date1 First date value
 * @param date2 Second date value
 * @returns True if first date greater than second date
 */
export function isDateGreat(date1: Date, date2: Date): boolean {
    return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
        > new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
}

/**
 * Return true if first date greater or equal to second date
 * @param date1 First date value
 * @param date2 Second date value
 * @returns True if first date greater or equal to second date
 */
export function isDateGreatOrEqual(date1: Date, date2: Date): boolean {
    return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
        >= new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
}

/**
 * Return true if first date time greater than second date time
 * @param date1 First date time value
 * @param date2 Second date time value
 * @returns True if first date time greater than second date time
 */
export function isDateTimeGreat(date1: Date, date2: Date): boolean {
    return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(),
        date1.getHours(), date1.getMinutes())
        > new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(),
            date2.getHours(), date2.getMinutes());
}

/**
 * Return true if first date time greater or equal to second date time
 * @param date1 First date time value
 * @param date2 Second date time value
 * @returns True if first date time greater or equal to second date time
 */
export function isDateTimeGreatOrEqual(date1: Date, date2: Date): boolean {
    return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(),
        date1.getHours(), date1.getMinutes())
        >= new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(),
            date2.getHours(), date2.getMinutes());
}

/**
 * Convert UTC date to local
 * @param date Date value
 * @returns Locale date
 */
export function convertUTCDateToLocalDate(date: Date): Date {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}

/**
 * Convert Json representation of timestamp to date value
 * @param timestamp Timestamp for example - 12:23:45
 * @returns Date value
 */
export function convertTimestampToDate(timestamp: string): Date {
    const tempTime = timestamp.split(":"),
        result = new Date();
    result.setHours(+tempTime[0]);
    result.setMinutes(+tempTime[1]);
    result.setSeconds(+tempTime[2]);
    return result;
}

/**
 * Convert Date object to timestamp string
 * @param date Date value
 * @param locale Locale value
 * @returns String representation of date value, for example - 12:23
 */
export function convertDateToTimestamp(date: Date, locale: string = DateTimeConstants.DEFAULT_LOCALE): string {
    return `${formatDate(date, 'HH', locale)}:${formatDate(date, 'mm', locale)}`;
}

/**
 * Get age from
 * @param birthdate Date of birth
 * @returns Age
 */
export function getAge(birthdate: Date): number {
    const now = new Date();
    let age = now.getFullYear() - birthdate.getFullYear();
    const monthDifference = now.getMonth() - birthdate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && now.getDate() < birthdate.getDate())) {
        age--;
    }

    return age;
}