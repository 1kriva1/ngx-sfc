import { Directive, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { isDefined, Position, UIConstants } from 'ngx-sfc-common';
import { BaseInputComponent } from '../../base/base-input.component';
import { IRangeInputTooltipModel } from '../range-input-tooltip.model';
import { RangeInputConstants } from '../range-input.constants';

@Directive()
export abstract class RangeBaseComponent extends BaseInputComponent<number> {

  @Input()
  max: number = 100;

  @Input()
  min: number = 0;

  @Input()
  step: number = 1;

  @Input()
  tooltip: boolean = true;

  @Input()
  showLimits: boolean = false;

  @Input()
  showValue: boolean = false;

  @Input()
  startIcon: IconDefinition | null = null;

  @Input()
  endIcon: IconDefinition | null = null;

  override get value(): number {
    return this._value ? this._value : this.min;
  }
  override set value(value: number) {
    this._value = value;
  }

  public showTooltip: boolean = false;

  public get tooltipModel(): IRangeInputTooltipModel {
    return {
      value: this.value.toString(),
      left: this.calculateLeftPosition(Number((this.value - this.min) * 100 / (this.max - this.min))),
      show: this.showTooltip
    }
  }

  public abstract tooltipPosition: Position;

  public get showBeforeLabel(): boolean {
    return this.showLimits || isDefined(this.startIcon);
  }

  public get showAfterLabel(): boolean {
    return this.showLimits || isDefined(this.endIcon) || this.showValue;
  }

  onHover(show: boolean): void {
    this.showTooltip = this.tooltip && show;
  }

  private calculateLeftPosition(newValue: number): string {
    const newPosition: number = this.sizeProportion * (RangeInputConstants.THUMB_HALF_SIZE - (newValue * RangeInputConstants.TOOLTIP_POSITION_FACTOR));
    return `calc(${newValue}${UIConstants.CSS_PERCENTAGE} + (${newPosition}${UIConstants.CSS_PIXELS}) )`;
  }
}
