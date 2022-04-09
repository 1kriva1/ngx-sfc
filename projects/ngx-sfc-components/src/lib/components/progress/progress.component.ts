import { Directive, Input } from "@angular/core";
import { ProgressColor } from "./progress-color.enum";

@Directive()
export abstract class ProgressBaseComponent {

    @Input()
    progress: number = 0;

    @Input()
    background?: string;

    @Input()
    getColor: (value: number) => string = this.getDefaultColor;

    getDefaultColor(value: number): string {
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
}