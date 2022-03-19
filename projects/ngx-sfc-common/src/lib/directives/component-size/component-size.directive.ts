import { Directive, ElementRef, Input } from '@angular/core';
import { UIConstants } from '../../constants';
import { ComponentSize } from '../../enums';
import { getCssLikeValue } from '../../utils';

@Directive({
  selector: '[sfcComponentSize]'
})
export class ComponentSizeDirective {

  @Input('sfcComponentSize')
  set size(value: ComponentSize | null | undefined) {
    this.style.fontSize = this.getSizeValue(value);
  }

  @Input()
  set customSize(value: number) {
    this.style.fontSize = getCssLikeValue(value, UIConstants.CSS_EM);
  }

  private get style(): any {
    return this.el.nativeElement.style;
  }

  constructor(private el: ElementRef) {
    this.style.fontSize = this.getSizeValue(this.size);
  }

  private getSizeValue(value: ComponentSize | null| undefined): string {
    switch (value) {
      case ComponentSize.Small:
        return getCssLikeValue(0.5, UIConstants.CSS_EM);
      case ComponentSize.Medium:
        return getCssLikeValue(1, UIConstants.CSS_EM);
      case ComponentSize.Large:
        return getCssLikeValue(2, UIConstants.CSS_EM);
      default:
        return getCssLikeValue(1, UIConstants.CSS_EM);
    }
  }
}
