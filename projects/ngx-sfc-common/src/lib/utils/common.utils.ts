import { Observable } from 'rxjs';
import { empty } from '../types';
import { segment } from '../types/segment.type';
import { toggleItem } from './collections.utils';
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
   * @param number The input to be tested
   * @returns - An indication if the input is a Number or can be coerced to a Number
   */
export function isNumeric(number: any): boolean {
  return !isNaN(parseFloat(number));
}

/**
 *  Determines if the input is a string
 * @param value The input to be tested
 * @returns An indication if the input is a string
 */
export function isString(value: any): boolean {
  return typeof value === 'string';
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

  function areFilesEqual() {
    return obj1.lastModified === obj2.lastModified
      && obj1.size === obj2.size
      && obj1.type === obj2.type;
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

  if (type === 'file') return areFilesEqual();

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

/**
 * Check if value is Json parsable string
 * @param value string value
 * @returns True if string can be JSON parsed
 */
export function isJsonString(value: string): boolean {
  try {
    const json = JSON.parse(value);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}

/**
 * Stop propagation and prevent default
 * @param event Event object
 */
export function stopAndPreventPropagation(event: Event): void {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * Update property in object by key
 * @param obj Object to change
 * @param key Property to change
 * @param newPropertyValue New property value
 * @param options Options for array types
 * @returns Updated object
 */
export function updatePropertyByKey<T>(
  obj: any,
  key: string,
  newPropertyValue: T,
  options: { arrayMode?: "toggle" | "replace"; arrayToggleValue?: T; } = {}
): any {
  const {
    arrayMode = "toggle",
    arrayToggleValue = (newPropertyValue as T)
  } = options;

  // Arrays: map recursively over items
  if (Array.isArray(obj)) {
    let changed = false;
    const mapped = obj.map(item => {
      const updated = updatePropertyByKey(item, key, newPropertyValue, options);
      if (updated !== item) changed = true;
      return updated;
    });
    return changed ? mapped : obj;
  }

  // Plain objects: iterate over keys immutably
  if (isObject(obj)) {
    const source = obj as Record<string, unknown>;
    let changed = false;
    const result: Record<string, unknown> = {};

    for (const propertyKey of Object.keys(source)) {
      const value = source[propertyKey];

      if (propertyKey === key) {
        // Matched key: apply update
        if (Array.isArray(value)) {
          if (arrayMode === "toggle") {
            const updatedArray = toggleItem(value as T[], arrayToggleValue);
            result[propertyKey] = updatedArray;
            if (updatedArray !== value) changed = true;
          } else {
            // replace mode
            if (!Array.isArray(newPropertyValue)) {
              throw new Error("arrayMode 'replace' requires newPropertyValue to be an array.");
            }
            const replaced = [...(newPropertyValue as unknown as unknown[])];
            result[propertyKey] = replaced;
            changed = true;
          }
        } else {
          // Non-array leaf -> set to newPropertyValue
          result[propertyKey] = newPropertyValue as unknown;
          if (result[propertyKey] !== value) changed = true;
        }
      } else {
        // Recurse into nested values
        const updatedVal = updatePropertyByKey(value, key, newPropertyValue, options);
        result[propertyKey] = updatedVal;
        if (updatedVal !== value) changed = true;
      }
    }

    return changed ? result : obj;
  }

  // Primitives or non-plain objects (Date, Map, etc.): return as-is
  return obj;
}

/**
 * Update property in object by path
 * @param obj Object to change
 * @param path Property to change
 * @param newPropertyValue New property value
 * @param previousPropertyValue New property value
 * @param options Options for array types
 * @returns Updated object
 */
export function updatePropertyByPath<T>(
  obj: any,
  path: string | segment[],
  newPropertyValue: T,
  previousPropertyValue: T,
  options: { arrayMode?: "toggle" | "replace"; } = {}
): any {
  const {    arrayMode = "toggle"  } = options;

  const segments = Array.isArray(path) ? path : _pathToSegments(path);

  /**
  * Parses a path string like:
  *  - "a.b.c"
  *  - "a.b[0].c"
  *  - "items[*].tags"
  * into segments: ["a","b",0,"c"] or ["items","*", "tags"]
  *
  * Supported:
  *  - Dot notation
  *  - Bracket numbers: [0]
  *  - Wildcard: [*] or .* (as a segment "*")
  *
  * Not supported:
  *  - Quoted property names in brackets (e.g., ["foo bar"])
  *  - Escaped dots in keys
  * @param path Property path
  * @returns Path segments
  */
 function _pathToSegments(path: string): segment[] {
   // Normalize brackets to dot form (e.g., a[0].b -> a.0.b, a[*].b -> a.*.b)
   const normalized = path
     .replace(/\[(\d+)\]/g, ".$1")
     .replace(/\[\*\]/g, ".*");
 
   const rawSegments = normalized.split(".").filter(s => s.length > 0);
   return rawSegments.map<segment>(seg => {
     if (seg === "*") return "*";
     const n = Number(seg);
     if (!Number.isNaN(n) && seg.trim() !== "" && String(n) === seg) {
       return n;
     }
     return seg;
   });
 }

  function _apply(current: unknown, remaining: segment[]): unknown {
    // Base: reached target path
    if (remaining.length === 0) {
      if (Array.isArray(current)) {
        if (arrayMode === "toggle") {
          return toggleItem(current as T[], previousPropertyValue);
        }
        // replace mode
        if (!Array.isArray(newPropertyValue)) {
          throw new Error("arrayMode 'replace' requires newPropertyValue to be an array.");
        }
        return [...(newPropertyValue as unknown as unknown[])];
      }
      // Non-array leaf -> set to newPropertyValue
      return newPropertyValue as unknown;
    }

    const [seg, ...rest] = remaining;

    // Wildcard handling
    if (seg === "*") {
      if (Array.isArray(current)) {
        // Map each element
        return (current as unknown[]).map(item => _apply(item, rest));
      }
      if (isObject(current)) {
        const objCurr = current as Record<string, unknown>;
        const result: Record<string, unknown> = {};
        for (const key of Object.keys(objCurr)) {
          result[key] = _apply(objCurr[key], rest);
        }
        return result;
      }
      // If not object/array, nothing to expand -> return as-is
      return current;
    }

    // Numeric index -> navigate arrays
    if (typeof seg === "number") {
      if (!Array.isArray(current)) {
        // Path expects array here, but current isn't an array => no-op
        return current;
      }
      const arr = current as unknown[];
      if (seg < 0 || seg >= arr.length) {
        // Out of bounds -> no-op (alternatively, you could extend the array)
        return current;
      }
      const updatedItem = _apply(arr[seg], rest);
      if (updatedItem === arr[seg]) {
        return current; // no structural change
      }
      const newArr = arr.slice();
      newArr[seg] = updatedItem;
      return newArr;
    }

    // String key -> navigate objects
    if (isObject(current)) {
      const objCurr = current as Record<string, unknown>;
      const nextVal = objCurr[seg];
      const updatedVal = _apply(nextVal, rest);

      if (updatedVal === nextVal) {
        return current; // no structural change
      }
      return { ...objCurr, [seg]: updatedVal };
    }

    // If we cannot traverse further (e.g., null, primitive, or array when expecting object) -> no-op
    return current;
  }

  return _apply(obj, segments);
}

/**
 * Get changed property key
 * @param previous Previous value
 * @param current Currency value
 * @returns Key of property that was changed
 */
export function findChangedPropertyKey(previous: any, current: any): string | empty {
  const path: string | empty = findChangedPropertyPath(previous, current),
    parts = path?.split('.');

  return parts && parts.length ? parts[parts.length - 1] : undefined;
}

/**
 * Get changed property path
 * @param previous Previous value 
 * @param current Currency value
 * @param parentKey Parent object key name
 * @returns Path of property that was changed
 */
export function findChangedPropertyPath(previous: any, current: any, parentKey: string = ''): string | empty {
  for (const key of Object.keys(current)) {
    const fullKey: string = parentKey ? `${parentKey}.${key}` : key;

    if (isObject(current[key]) && current[key] !== null && previous[key]) {
      const nestedChange = findChangedPropertyPath(previous[key], current[key], fullKey);

      if (nestedChange) {
        return nestedChange;
      }
    } else {
      if (previous[key] !== current[key]) {
        return fullKey;
      }
    }
  }

  return null;
}

/**
 * Clone object without any reference
 * @param value  Object to clone
 * @returns Cloned object
 */
export function deepClone(value: any): any {
  return JSON.parse(JSON.stringify(value));
}