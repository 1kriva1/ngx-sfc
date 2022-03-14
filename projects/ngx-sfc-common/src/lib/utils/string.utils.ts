import { CommonConstants } from "../constants";
import { isDefined } from "./common.utils";

/**
 * Return true if string has value(not empty string)
 * @param value String value to check
 * @returns True if string is not null and defined(not empty string)
 */
export function isNullOrEmptyString(value: string | undefined | null) {
    return isDefined(value) || value === CommonConstants.EMPTY_STRING;
}

/**
 * Return true if value contains includeValue
 * @param value String value to check
 * @param includeValue Value to check if it include
 * @returns True if value contains includeValue
 */
export function contains(value: string | undefined | null, includeValue: string): boolean {
    return !isNullOrEmptyString(value) && !isNullOrEmptyString(includeValue)
        ? (value as string).toLowerCase()
            .includes(includeValue.toLowerCase())
        : false;
}

/**
 * Return trimed value
 * @param value Value for trim modification
 * @returns Trimed value
 */
export function trim(value: string) {
    return isNullOrEmptyString(value) ? value : value.replace(/\s/g, '')
}