import { Directive, ElementRef, Input } from '@angular/core';
import { UIConstants } from '../../constants';

@Directive({
  selector: '[sfcIf]'
})
export class IfDirective {

  @Input()
  set sfcIf(show: boolean) {
    this.style.display = show
      ? this.display || UIConstants.CSS_INITIAL
      : UIConstants.CSS_NONE;
  }

  private display: string;

  private get style(): any { return this.el.nativeElement.style; }

  constructor(private el: ElementRef) {
    this.display = this.style.display;
  }
}