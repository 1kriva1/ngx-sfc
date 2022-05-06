import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector: '[sfcDestroyParent]'
})
export class DestroyParentDirective {

    @Input('sfcDestroyParent')
    set destroyParent(value: boolean) {
        if (value) {
            setTimeout(() => this.el.nativeElement.parentElement?.remove(), this.delay);
        }
    }

    @Input()
    delay: number = 0;

    constructor(private el: ElementRef) { }
}