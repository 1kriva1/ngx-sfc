import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { getCssLikeValue } from '../../utils';

@Directive({
  selector: '[sfcThrowElementOnHover]'
})
export class ThrowElementOnHoverDirective {

  @Input('sfcThrowElementOnHover')
  throwValue?: number;

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

  private throw(value?: number | null) {
    this.style.transform = value ? `translateY(${getCssLikeValue(value)})` : null;
  }
}