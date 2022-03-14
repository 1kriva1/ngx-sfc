import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { getCssLikePx } from '../../utils';

@Directive({
  selector: '[sfc-throw-element-on-hover]'
})
export class ThrowElementOnHoverDirective {

  @Input('sfc-throw-element-on-hover')
  throwValue: number | null = null;

  @HostListener('mouseenter') onMouseEnter() {
    this.throw(this.throwValue);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.throw(null);
  }

  private get style(): any {
    return this.el.nativeElement.style;
  }

  constructor(private el: ElementRef) { }

  private throw(value: number | null) {
    this.style.transform = value ? `translateY(${getCssLikePx(value)})` : null;
  }
}