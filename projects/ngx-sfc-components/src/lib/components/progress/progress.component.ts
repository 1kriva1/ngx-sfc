import { Directive, Input } from "@angular/core";
import { getProgressColorDefaultFunc } from "./progress.utils";

@Directive()
export abstract class ProgressBaseComponent {

    @Input()
    progress: number = 0;

    @Input()
    background?: string;

    @Input()
    getColor: (value: number, total?: number) => string = getProgressColorDefaultFunc;
}