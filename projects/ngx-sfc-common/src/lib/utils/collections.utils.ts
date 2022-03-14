import { CommonConstants } from "../constants";
import { SortingDirection } from "../enums";
import { isDefined } from "./common.utils";
import { isNullOrEmptyString } from "./string.utils";

/**
 * Return true if collection not empty
 * @param collection Array of items
 * @returns True if collection not empty
 */
export function any<T>(collection: Array<T>): boolean {
    return isDefined(collection) && collection.length > 0;
}

/**
 * Return true if collection has such value
 * @param collection Array of items
 * @param value Value to check
 * @returns True if found value in collection
 */
export function hasItem<T>(collection: Array<T>, value: T): boolean {
    return any(collection)
        && collection.findIndex(item => item === value) !== CommonConstants.NOT_FOUND_INDEX;
}

/**
 * Return true if collection has such value by predicate function
 * @param collection Array of items
 * @param predicate Function to define check logic
 * @returns True if found value in collection
 */
export function hasItemBy<T>(collection: Array<T>, predicate: (item: T) => boolean): boolean {
    return any(collection) && collection.findIndex(predicate) !== CommonConstants.NOT_FOUND_INDEX;
}

/**
 * Return true if collection of objects has such value as object
 * @param collection Array of objects
 * @param property Property name
 * @param value Value to check
 * @returns True if found value in collection
 */
export function hasObjectItem<T>(collection: Array<any>, // TODO <-- Array<T>
    property: string, value: T): boolean {
    return any(collection)
        && collection.findIndex(item =>
            item.hasOwnProperty(property)
            && item[property] === value) !== CommonConstants.NOT_FOUND_INDEX;
}

/**
 * Return value from collection by predicate function
 * @param collection Array of items
 * @param predicate Function to define search logic
 * @returns Value from collection
 */
export function firstOrDefault<T>(collection: Array<T>, predicate: (item: T) => boolean)
    : T | null | undefined {
    return any(collection) ? collection.find(predicate) : null;
}

/**
 * Return first item from collection
 * @param collection Array of items
 * @returns First value from collection
 */
export function firstItem<T>(collection: Array<T>): T | null | undefined {
    return any(collection) ? collection[0] : null;
}

/**
 * Return last item from collection
 * @param collection Array of items
 * @returns Last value from collection
 */
export function lastItem<T>(collection: Array<T>): T | null | undefined {
    return any(collection) ? collection[collection.length - 1] : null;
}

/**
 * Return True if all values match predicate function
 * @param collection Array of objects
 * @param predicate Function to define check logic
 * @returns True if all values match predicate
 */
export function all<T>(collection: Array<T>, predicate: (item: T) => boolean): boolean {
    return any(collection) ? collection.filter(predicate).length == collection.length : false;
}

/**
 * Return items from collection by predicate function
 * @param collection Array of items
 * @param predicate Function to define search logic
 * @returns Values from collection
 */
export function where<T>(collection: Array<T>, predicate: (item: T) => boolean)
    : Array<T> | null | undefined {
    return any(collection) ? collection.filter(predicate) : null;
}

/**
 * Return sliced collection by page number and page size
 * @param collection Array of items
 * @param page Page number
 * @param size Page size
 * @returns Sliced collection
 */
export function skip<T>(collection: Array<T>, page: number, size: number): Array<T> {
    if (any(collection)) {
        let start = (page - 1) * size;
        return collection.slice(start, start + size);
    }

    return collection;
}

/**
 * Return sorted collection of objects by property
 * @param collection Array of items
 * @param property Property name
 * @param direction Sorting direction
 * @returns Sorted collection
 */
export function sortBy<T>(collection: Array<T>, property: string,
    direction: SortingDirection): Array<T> {
    if (any(collection)) {
        let _sortFunc = (a: any, b: any) =>
            (t1: number, t2: number) =>
                (a[property] > b[property] ? t1 : t2);

        return direction == SortingDirection.Ascending
            ? collection.sort((a: any, b: any) => _sortFunc(a, b)(1, -1))
            : collection.sort((a: any, b: any) => _sortFunc(a, b)(-1, 1));
    }

    return collection;
}

/**
 * Return sorted collection of objects by path
 * @param collection Array of items
 * @param path Path to property
 * @param direction Sorting direction
 * @returns Sorted collection
 */
export function sortByPath<T>(collection: Array<T>, path: string, direction: SortingDirection)
    : Array<T> {
    if (any(collection)) {
        if (isNullOrEmptyString(path))
            throw new Error('Collection utils | Sort By Path function --> Path is empty.');

        const pathParts = path.split('.');

        if (!any(pathParts))
            throw new Error('Collection utils | Sort By Path function --> Path is incorrect.');

        const partsLength = pathParts.length;

        collection.sort((a: any, b: any) => {
            var i = 0;
            while (i < partsLength) { a = a[pathParts[i]]; b = b[pathParts[i]]; i++; }

            return direction == SortingDirection.Ascending
                ? a > b ? 1 : -1
                : a > b ? -1 : 1;
        });

        return collection;
    }

    return collection;
}

/**
 * Return collection without matches
 * @param collection Array of items
 * @returns Collection without matches
 */
export function distinct<T>(collection: Array<T>): Array<T> {
    return any(collection)
        ? collection.filter((value, index, self) => self.indexOf(value) === index)
        : collection;
}

/**
 * Return sum value from collection items by map function
 * @param collection Array of items
 * @param select Map function
 * @returns Sum value of colection items
 */
export function sum<T>(collection: Array<T>, select: (item: T) => number): number {
    return any(collection)
        ? collection
            .map(select)
            .reduce((a, b) => { return a + b }, 0)
        : 0;
}

/**
 * Return max value from collection items by map function
 * @param collection Array of items
 * @param select Map function
 * @returns Max value of collection items
 */
export function max<T>(collection: Array<T>, select: (item: T) => number): number {
    if (any(collection))
        return Math.max(...collection.map(select));

    throw new Error('Collection utils | Max function --> Collection is empty.')
}

/**
 * Delete items from collection by predicate
 * @param collection Array of items
 * @param predicate Function to define remove logic
 */
export function remove<T>(collection: Array<T>, predicate: (item: T) => boolean): void {
    var i = collection.length;
    while (i--) {
        if (predicate(collection[i])) {
            collection.splice(i, 1);
        }
    }
}

/**
 * Delete item from collection by predicate
 * @param collection Array of items
 * @param predicate Function to define remove logic
 */
export function removeItem<T>(collection: Array<T>, predicate: (item: T) => boolean): void {
    const foundItem: T | null | undefined = firstOrDefault(collection, predicate);
    if (isDefined(foundItem)) {
        collection.splice(collection.indexOf(foundItem as T), 1);
    }
}

/**
 * Return collection or empty if collection is not defined
 * @param collection Array of items
 * @returns Collection or empty
 */
export function getCollectionOrEmpty<T>(collection: Array<T>): Array<T> {
    return isDefined(collection) ? collection : [];
}