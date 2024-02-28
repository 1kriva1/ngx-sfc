import { Directive, ElementRef, Input } from '@angular/core';
import { UIClass } from '../../enums';
import { getCssLikeValue } from '../../utils';

@Directive({
  selector: '[sfcCollapseExpand]'
})
export class CollapseExpandDirective {

  private readonly EXPAND_COLLAPSE_TRANSITION_DELAY_DEFAULT: number = 0.5;

  @Input('sfcCollapseExpand')
  set expand(expand: boolean) {
    this.style.maxHeight = expand
      ? getCssLikeValue(this.el.nativeElement.scrollHeight)
      : 0;
  }

  @Input()
  set delay(value: number) {
    this.style.transition = this.getTransitionValue(value);
  };

  private get style(): any {
    return this.el.nativeElement.style;
  }

  constructor(private el: ElementRef) {
    this.style.transition = this.getTransitionValue();
    this.style.overflow = UIClass.Hidden;
  }

  private getTransitionValue(delay: number = this.EXPAND_COLLAPSE_TRANSITION_DELAY_DEFAULT) {
    return `max-height ${delay}s ease-out`;
  }
}