import { CommonConstants, UIConstants } from "../constants";
import { isDefined } from "./common.utils";

/**
 * Return CSS like value
 * @param value Value as number
 * @returns Value as '1px'
 */
export function getCssLikePx(value: number): string {
    return value + UIConstants.CSS_PIXELS;
}

/**
 * Return CSS like value
 * @param value Value as number
 * @returns Value as '1%'
 */
export function getCssLikePercentage(value: number): string {
    return value + UIConstants.CSS_PERCENTAGE;
}

/**
 * Return CSS like value
 * @param value Value as number
 * @returns Value as '1deg'
 */
export function getCssLikeDegrees(value: number): string {
    return value + UIConstants.CSS_DEGREES;
}

/**
 * Parse CSS like value to number
 * @param value CSS like value
 * @returns Number value
 */
export function getValueFromCssLikePx(value: string): number {
    return +value.replace(UIConstants.CSS_PIXELS, CommonConstants.EMPTY_STRING);
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