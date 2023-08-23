import { CommonConstants } from "ngx-sfc-common";
import { ProgressColor } from "./progress-color.enum";

export function getProgressColorDefaultFunc(value: number): string {
    if (value < 12) {
        return ProgressColor.MIN_LOW;
    } else if (value >= 12 && value < 24) {
        return ProgressColor.LOW;
    } else if (value >= 24 && value < 36) {
        return ProgressColor.MAX_LOW;
    } else if (value >= 36 && value < 48) {
        return ProgressColor.MIN_MEDIUM;
    } else if (value >= 48 && value < 60) {
        return ProgressColor.MEDIUM;
    } else if (value >= 60 && value < 72) {
        return ProgressColor.MAX_MEDIUM;
    } else if (value >= 72 && value < 84) {
        return ProgressColor.MIN_HIGH;
    } else if (value >= 84 && value < 96) {
        return ProgressColor.HIGH;
    } else {
        return ProgressColor.MAX_HIGH;
    }
}

export function getProgressColorDynamicallyFunc(value: number, total?: number): string {
    const colorsCount = Object.keys(ProgressColor).length,
        part = Math.ceil((total || CommonConstants.FULL_PERCENTAGE) / colorsCount);

    if (value < part) {
        return ProgressColor.MIN_LOW;
    } else if (value >= part && value < part * 2) {
        return ProgressColor.LOW;
    } else if (value >= part * 2 && value < part * 3) {
        return ProgressColor.MAX_LOW;
    } else if (value >= part * 3 && value < part * 4) {
        return ProgressColor.MIN_MEDIUM;
    } else if (value >= part * 4 && value < part * 5) {
        return ProgressColor.MEDIUM;
    } else if (value >= part * 5 && value < part * 6) {
        return ProgressColor.MAX_MEDIUM;
    } else if (value >= part * 6 && value < part * 7) {
        return ProgressColor.MIN_HIGH;
    } else if (value >= part * 7 && value < part * 8) {
        return ProgressColor.HIGH;
    } else {
        return ProgressColor.MAX_HIGH;
    }
}