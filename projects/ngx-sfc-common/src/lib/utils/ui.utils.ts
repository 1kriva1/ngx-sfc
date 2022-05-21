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

/**
 * Convert RGB color to HEX
 * @param r Red
 * @param g Green
 * @param b Blue
 * @returns HEX value
 */
export function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Convert HEX to RGB value
 * @param hex HEX value
 * @returns RGB value
 */
export function hexToRgb(hex: string): string | null {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
        return `rgb(${r}, ${g}, ${b})`;
    }
    return null;
}

/**
 * Set opacity for RGB value
 * @param rgb Rgb value with {opacity} placeholder
 * @param opacity Opacity value
 * @returns RGB value with relevant opacity
 */
export function replaceRgbOpacity(rgb: string, opacity: number) {
    return rgb.replace(UIConstants.RGB_OPACITY_PLACEHOLDER, opacity.toString());
}