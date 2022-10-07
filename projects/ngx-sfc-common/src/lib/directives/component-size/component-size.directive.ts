import { Directive, ElementRef, Input } from '@angular/core';
import { UIConstants } from '../../constants';
import { ComponentSize } from '../../enums';
import { getCssLikeValue } from '../../utils';

@Directive({
  selector: '[sfcComponentSize]'
})
export class ComponentSizeDirective {

  private _size: ComponentSize | null | undefined;
  @Input('sfcComponentSize')
  set size(value: ComponentSize | null | undefined) {
    this._size = value;
    this.style.fontSize = getCssLikeValue(this.getSizeProportion(), UIConstants.CSS_EM);
  }
  get size(): ComponentSize | null | undefined {
    return this._size;
  }

  private _customSize: number | null = null;
  @Input()
  set customSize(value: number | null) {
    this._customSize = value;

    if (this._customSize)
      this.style.fontSize = getCssLikeValue(this._customSize, UIConstants.CSS_EM);
  }
  get customSize(): number | null {
    return this._customSize;
  }

  public get proportion(): number {
    return this.customSize || this.getSizeProportion();
  }

  private get style(): any {
    return this.el.nativeElement.style;
  }

  constructor(private el: ElementRef) {
    this.style.fontSize = getCssLikeValue(this.getSizeProportion(), UIConstants.CSS_EM);
  }

  private getSizeProportion(): number {
    switch (this.size) {
      case ComponentSize.Small:
        return 0.5;
      case ComponentSize.Medium:
        return 1;
      case ComponentSize.Large:
        return 2;
      default:
        return 1;
    }
  }
}
