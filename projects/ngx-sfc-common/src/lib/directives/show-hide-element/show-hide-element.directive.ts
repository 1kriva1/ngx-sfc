import { Directive, ElementRef, Input } from '@angular/core';
import { UIConstants } from '../../constants';

@Directive({
  selector: '[sfc-show-hide-element]'
})
export class ShowHideElementDirective {

  private readonly SHOW_HIDE_TRANSITION_DELAY_DEFAULT: number = 0.5;  

  @Input('sfc-show-hide-element')
  set showHideElement(show: boolean) {
    this.style.visibility = show
      ? UIConstants.CSS_VISIBILITY_VISIBLE
      : UIConstants.CSS_VISIBILITY_HIDDEN;
    this.style.opacity = show ? 1 : 0;
  }

  @Input('transition-delay')
  set transitionDelay(delay: number) {
    this.style.transition = this.getTransitionValue(delay);
  };

  private get style(): any {
    return this.el.nativeElement.style;
  }

  constructor(private el: ElementRef) {
    this.style.transition = this.getTransitionValue();
  }

  private getTransitionValue(delay: number = this.SHOW_HIDE_TRANSITION_DELAY_DEFAULT) {
    return `visibility ${delay}s, 
            opacity ${delay}s 
            linear`;
  }
}