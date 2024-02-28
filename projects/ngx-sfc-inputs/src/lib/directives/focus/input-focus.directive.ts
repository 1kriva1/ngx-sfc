import { Directive, Input, ElementRef, AfterViewInit } from "@angular/core";
import { empty } from "ngx-sfc-common";

@Directive({ selector: '[sfcFocusInput]' })
export class InputFocusDirective implements AfterViewInit {

    @Input('sfcFocusInput')
    set focus(focus: boolean | empty) {
        if (focus)
            this.el.nativeElement?.focus();
    }

    constructor(private el: ElementRef) { }

    ngAfterViewInit(): void { this.el.nativeElement?.focus(); }
}