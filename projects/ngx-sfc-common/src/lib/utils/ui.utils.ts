import { CommonConstants, UIConstants } from "../constants";
import { isDefined } from "./common.utils";

/**
 * Return CSS like value
 * @param value Value as number
 * @returns Value as '1px'
 */
export function getCssLikeValue(value: number,
    type: string = UIConstants.CSS_PIXELS): string {
    return value + type;
}

/**
 * Parse CSS like value to number
 * @param value CSS like value
 * @returns Number value
 */
export function getValueFromCssLikeValue(value: string,
    type: string = UIConstants.CSS_PIXELS): number {
    return +value.replace(type, CommonConstants.EMPTY_STRING);
}

/**
 * Return CCS like calc value
 * @param value All value (100% by default)
 * @param part Part value
 * @returns Calc value
 */
export function getCalcValue(part: number, value: number = 100): string {
    return `calc(${value}${UIConstants.CSS_PERCENTAGE} / ${part} )`;
}

/**
 * Add classes to HTML element
 * @param element HTML element
 * @param classNames Array of CSS classes
 */
export function addClasses(element: HTMLElement, ...classNames: Array<string>): void {
    if (isDefined(element)) {
        classNames.forEach((className) => element.classList.add(className));
    }
}

/**
 * Remove classes to HTML element
 * @param element HTML element
 * @param classNames Array of CSS classes
 */
export function removeClasses(element: HTMLElement, ...classNames: Array<string>): void {
    if (isDefined(element)) {
        classNames.forEach((className) => element.classList.remove(className));
    }
}