import { Directive, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, Direction, isDefined, Position, UIConstants } from 'ngx-sfc-common';
import { BaseInputComponent } from '../../base/base-input.component';
import { RangeInputType } from '../enums/range-input-type.enum';
import { IRangeLimitValueModel } from '../models/range-limit-value.model';
import { IRangeInputTooltipModel } from '../models/range-input-tooltip.model';
import { RangeInputConstants } from '../range-input.constants';
import { IRangeLimitIndexModel } from '../models/range-limit-index.model';
import { RangeLimitInputState } from '../enums/range-limit-input-state.enum';

@Directive()
export abstract class RangeBaseComponent extends BaseInputComponent<number | IRangeLimitValueModel> {

  Constants = RangeInputConstants;
  RangeInputType = RangeInputType;

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

  @Input()
  stars: boolean = false;

  @Input()
  @HostBinding('class.multiple')
  multiple: boolean = false;

  @Input()
  generateMultipleLabel!: (from: number, to: number) => string;

  @ViewChild('toRange', { static: false })
  toRangeEl!: ElementRef;

  @ViewChild('fromRange', { static: false })
  fromRangeEl!: ElementRef;

  override bordered: boolean = false;

  override get value(): number | IRangeLimitValueModel {
    return this._value
      ? this._value
      : this.multiple
        ? { from: this.min, to: this.max }
        : this.min;
  }

  override set value(value: number | IRangeLimitValueModel) {
    this._value = value;
  }

  public get showAfterLabel(): boolean {
    return this.showLimits || isDefined(this.endIcon);
  }

  public abstract tooltipPosition: Position;

  protected abstract direction: Direction;

  public showTooltip: boolean = false;
  public showFromTooltip: boolean = false;
  public showToTooltip: boolean = false;
  public indexModel: IRangeLimitIndexModel = { from: RangeLimitInputState.Default, to: RangeLimitInputState.Active };  

  public get valueLabel(): string {
    return this.multiple
      ? isDefined(this.generateMultipleLabel)
        ? this.generateMultipleLabel((this.value as IRangeLimitValueModel).from, (this.value as IRangeLimitValueModel).to)
        : `From: ${(this.value as IRangeLimitValueModel).from} - To: ${(this.value as IRangeLimitValueModel).to}`
      : this.value.toString();
  }

  public get starsValue(): number {
    return (this.value as number) * RangeInputConstants.STARS_COUNT / CommonConstants.FULL_PERCENTAGE;
  }

  public get showBeforeLabel(): boolean {
    return this.showLimits || isDefined(this.startIcon);
  }

  public get trackPosition(): string {
    return this.direction == Direction.Vertical ? Position.Top : Position.Right;
  }

  public getTooltipModel(type: RangeInputType): IRangeInputTooltipModel | null {
    let value: number = 0, show: boolean = false;

    switch (type) {
      case RangeInputType.Single:
        value = (this.value as number);
        show = this.showTooltip;
        break;
      case RangeInputType.From:
        value = (this.value as IRangeLimitValueModel).from;
        show = this.showFromTooltip;
        break;
      case RangeInputType.To:
        value = (this.value as IRangeLimitValueModel).to;
        show = this.showToTooltip;
        break;
    }

    return this.tooltip ? {
      value: value?.toString(),
      position: this.calculatePosition(Number((value - this.min) * CommonConstants.FULL_PERCENTAGE / (this.max - this.min))),
      show: show
    } : null;
  }

  public onHover(show: boolean, type: RangeInputType): void {
    switch (type) {
      case RangeInputType.Single:
        this.showTooltip = this.tooltip && show;
        break;
      case RangeInputType.From:
        this.showFromTooltip = this.tooltip && show;
        break;
      case RangeInputType.To:
        this.showToTooltip = this.tooltip && show;
        break;
    }
  }

  public onChangeMultiple(value: number | null, type: RangeInputType): void {
    const model: IRangeLimitValueModel = (this.value as IRangeLimitValueModel);

    switch (type) {
      case RangeInputType.From:
        this.handleFrom(model, value!);
        break;
      case RangeInputType.To:
        this.handleTo(model, value!);
        break;
    }

    super.onChange(model);
  }

  private handleFrom(model: IRangeLimitValueModel, value: number): void {
    model.from = value;

    if (model.to < model.from) {
      model.from = model.to;
      this.fromRangeEl.nativeElement.value = model.to;
    }

    if (model.from == model.to) {
      this.indexModel.to = RangeLimitInputState.Default;
      this.indexModel.from = RangeLimitInputState.Active;
    }
  }

  private handleTo(model: IRangeLimitValueModel, value: number): void {
    model.to = value;

    if (model.from > model.to) {
      model.to = model.from;
      this.toRangeEl.nativeElement.value = model.from;
    }

    if (model.from == model.to) {
      this.indexModel.to = RangeLimitInputState.Active;
      this.indexModel.from = RangeLimitInputState.Default;
    }
  }

  private calculatePosition(newValue: number): string {
    const newPosition: number = this.sizeProportion * (RangeInputConstants.THUMB_HALF_SIZE - (newValue * RangeInputConstants.TOOLTIP_POSITION_FACTOR));
    return `calc(${newValue}${UIConstants.CSS_PERCENTAGE} + (${newPosition}${UIConstants.CSS_PIXELS}) )`;
  }
}
