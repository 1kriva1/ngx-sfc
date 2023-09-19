import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faAngleLeft, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UIConstants } from 'ngx-sfc-common';
import { getCssLikeValue, isDefined } from 'ngx-sfc-common';
import { Subscription } from 'rxjs';
import { BaseInputComponent } from '../base/base-input.component';
import { INumberSpinnerModel } from './parts/spinner/number-spinner.model';

@Component({
  selector: 'sfc-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['../../styles/input.component.scss', '../../styles/vertical-input.component.scss',
    './number-input.component.scss']
})
export class NumberInputComponent
  extends BaseInputComponent<number>
  implements OnInit, OnDestroy {

  @Input()
  max: number = Number.MAX_SAFE_INTEGER;

  @Input()
  min: number = Number.MIN_SAFE_INTEGER;

  @Input()
  step: number = 1;

  @Input()
  sign: boolean = true;

  @Input()
  fixedWidth: boolean = false;

  @Input()
  fixedActions: boolean = false;

  @Input()
  nextIcon: IconDefinition = faAngleRight;

  @Input()
  prevIcon: IconDefinition = faAngleLeft;

  @Input()
  edit: boolean = false;

  @Input()
  disableNext: boolean = false;

  @Input()
  disablePrevious: boolean = false;

  override bordered: boolean = false;

  get spinnerModel(): INumberSpinnerModel {
    return {
      disabled: this.disabled,
      fixedActions: this.fixedActions,
      fixedWidth: this.fixedWidth,
      nextIcon: this.nextIcon,
      prevIcon: this.prevIcon,
      step: this.step,
      value: this.defaultValue,
      max: this.max,
      min: this.min,
      edit: this.edit,
      disableNext: this.disableNext,
      disablePrevious: this.disablePrevious
    }
  }

  private get defaultValue(): number {
    return this.value ||
      (this.min == Number.MIN_SAFE_INTEGER ? 0 : this.min) ||
      0;
  }

  private _subscription!: Subscription;

  ngOnInit(): void {
    this._subscription =
      this.value$.subscribe(value => this.updateWidth(value));
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  onChangeValue(event: Event): void {
    const newValue: number = +(event.target as any).value;

    if (this.validateValue(newValue))
      super.onChange(newValue);
    else
      this.inputElementRef.nativeElement.value = this.defaultValue;
  }

  update(newValue: number): void {
    if (this.validateValue(newValue)) {
      this.updateWidth();
      super.onChange(newValue);
    }
  }

  updateWidth(value?: number): void {
    this.inputElementRef.nativeElement.style.width =
      getCssLikeValue(`${value || this.inputValue}`.length,
        UIConstants.CSS_CH);
  }

  private validateValue(newValue: number): boolean {
    return (!isDefined(this.min) || newValue >= this.min)
      && (!isDefined(this.max) || newValue <= this.max);
  }
}
