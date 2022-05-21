import { Observable } from 'rxjs';

/**
 * Return true if value defined
 * @param value Value to check
 * @returns True if value is not null and defined
 */
export function isDefined<T>(value: T | undefined | null): boolean {
    return <T>value !== undefined && <T>value !== null;
}

/**
 * Return true if value is object
 * @param value Value to check
 * @returns True if value is object
 */
export function isObject(value: any): boolean {
    return (isDefined(value) && typeof value === 'object' && !Array.isArray(value));
}

/**
 * Return true if data is observable
 * @param data Object to check
 * @returns True if data is observable
 */
export function isAsyncData(data: any) {
    return data instanceof Observable;
}

/**
 * Return extended object with new property
 * @param obj Object to extend by property
 * @param property New property name 
 * @param value Value for new property
 * @returns Extended object with new property
 */
export function addPropertyToObject(obj: any, property: string, value: any = null): any {
    if (!isDefined(property) && !obj.hasOwnProperty(property)) {
        let newObj: any = {};
        newObj[property] = value;
        obj = { ...obj, ...newObj };
    }

    return obj;
}

/**
 * Remove property from object
 * @param obj Object for removing property
 * @param property Property name to remove
 */
export function removePropertyFromObject(obj: any, property: string): void {
    if (obj.hasOwnProperty(property)) {
        delete obj[property];
    }
}

/**
  * Deep merge object with others
  * @param target Object to merge
  * @param sources 
  */

/**
 * Deep merge object with others
 * @param target  Object to merge
 * @param sources Objects to be merged with target
 * @returns Merged object
 */
export function mergeDeep(target: any, ...sources: any[]): any {
    if (!sources.length)
        return target;

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

/**
 * Get type's property name safety
 * @param name KeyOf property
 * @returns Type's property name
 */
export const nameof = <T>(name: keyof T) => name;