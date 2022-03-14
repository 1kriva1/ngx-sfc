import { DateTimeConstants } from "../constants";
import { isDefined } from "./common.utils";

/**
 * Set minutes for date
 * @param date Date value
 * @param minute Minute value
 * @returns Date with minute value
 */
 export function setMinutes(date: Date, minute: number): Date {
    date.setMinutes(minute);
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
    );
}

/**
 * Set hours for date
 * @param date Date value
 * @param hour Hour value
 * @returns Date with hour value
 */
export function setHours(date: Date, hour: number): Date {
    date.setHours(hour);
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
    );
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
    date.setFullYear(year);
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
    );
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
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    return date1.getTime() === date2.getTime();
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