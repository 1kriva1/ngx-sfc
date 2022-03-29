import {
    Directive, Input
} from "@angular/core";

@Directive()
export abstract class TabSliderBase {
    @Input()
    count: number = 1;

    @Input()
    index: number = 0;

    abstract get style(): any;
}
