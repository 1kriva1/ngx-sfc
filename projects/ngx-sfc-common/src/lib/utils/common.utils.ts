import { Observable } from 'rxjs';
import { isEqualDateTimes } from './date-time.utils';

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
  return (isDefined(value) && typeof value === 'object'
    && !Array.isArray(value)
    && !(value instanceof Date || value instanceof File));
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
  if (isDefined(property) && !obj.hasOwnProperty(property)) {
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

/**
   * Determines if the input is a Number or something that can be coerced to a Number
   * @param - The input to be tested
   * @returns - An indication if the input is a Number or can be coerced to a Number
   */
export function isNumeric(number: any): boolean {
  return !isNaN(parseFloat(number));
}

/**
 * Return true if current browser is Chrome
 * @returns If current browser is Chrome
 */
export function isChromeBrowser(): boolean {
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

/**
 * Return true if value is valid email address
 * @returns True if it's valid email address
 */
export function isEmail(value: string): boolean {
  return isDefined(value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ));
}

/**
 * Return true if string is "true"
 * @returns parsed string as boolean
 */
export function parseBoolean(value: string): boolean {
  return /^true$/i.test(value);
}

/**
 * Return true if values equal
 * @param obj1 First value to compare
 * @param obj2 Second value to compare
 * @returns True if equal
 */
export function isEqual(obj1: any, obj2: any) {

  /**
   * More accurately check the type of a JavaScript object
   * @param  {Object} obj The object
   * @return {String}     The object type
   */
  function getType(obj: any) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  }

  function areArraysEqual() {

    // Check length
    if (obj1.length !== obj2.length) return false;

    // Check each item in the array
    for (let i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) return false;
    }

    // If no errors, return true
    return true;

  }

  function areObjectsEqual() {

    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

    // Check each item in the object
    for (let key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        if (!isEqual(obj1[key], obj2[key])) {

          return false;
        }
      }
    }

    // If no errors, return true
    return true;

  }

  function areFunctionsEqual() {
    return obj1.toString() === obj2.toString();
  }

  function arePrimativesEqual() {
    return obj1 === obj2;
  }

  function areDatesEqual() {
    return isEqualDateTimes(obj1, obj2);
  }

  // Get the object type
  let type = getType(obj1);

  // If the two items are not the same type, return false
  if (type !== getType(obj2)) return false;

  // Compare based on type
  if (type === 'array') return areArraysEqual();

  if (type === 'date') return areDatesEqual();

  if (type === 'object') return areObjectsEqual();

  if (type === 'function') return areFunctionsEqual();

  return arePrimativesEqual();
}

/**
 * Generate unique identificator
 * @returns Random GUID
 */
export function generateGuid(): string {
  let S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}