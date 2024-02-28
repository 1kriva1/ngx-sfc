import { Component } from '@angular/core';
import { Direction, getCssLikeValue, Position } from 'ngx-sfc-common';
import { RangeBaseComponent } from '../base/range-base.component';

@Component({
  selector: 'sfc-range-input-vertical',
  templateUrl: './range-input-vertical.component.html',
  styleUrls: ['../../../styles/input.component.scss', '../../../styles/vertical-input.component.scss',
    '../base/range-base.component.scss', './range-input-vertical.component.scss']
})
export class RangeInputVerticalComponent extends RangeBaseComponent {

  public tooltipPosition: Position = Position.Bottom;

  protected direction: Direction = Direction.Vertical;

  override get showAfterLabel(): boolean {
    return super.showAfterLabel || this.showValue;
  }

  public get componentHeight(): string | null {
    return this.inputElementRef
      ? getCssLikeValue(this.inputElementRef.nativeElement.getBoundingClientRect().height)
      : null;
  }
}
