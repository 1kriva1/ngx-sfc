import { Component, Input } from '@angular/core';
import { faAngleLeft, faAngleRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { isDefined } from 'ngx-sfc-common';
import { BaseInputComponent } from '../base/base-input.component';
import { INumberSpinnerModel } from './parts/spinner/number-spinner.model';

@Component({
  selector: 'sfc-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['../../styles/input.component.scss', '../../styles/vertical-input.component.scss']
})
export class NumberInputComponent extends BaseInputComponent<number> {

  @Input()
  max!: number;

  @Input()
  min!: number;

  @Input()
  step: number = 1;

  @Input()
  fixedWidth: boolean = false;

  @Input()
  fixedActions: boolean = false;

  @Input()
  nextIcon: IconDefinition = faAngleRight;

  @Input()
  prevIcon: IconDefinition = faAngleLeft;

  get spinnerModel(): INumberSpinnerModel {
    return {
      disabled: this.disabled,
      fixedActions: this.fixedActions,
      fixedWidth: this.fixedWidth,
      nextIcon: this.nextIcon,
      prevIcon: this.prevIcon,
      step: this.step,
      value: this.value || 0,
      max: this.max,
      min: this.min
    }
  }

  update(newValue: number): void {
    if (this.validateValue(newValue)) {
      super.onChange(newValue);
    }
  }

  private validateValue(newValue: number): boolean {
    return (!isDefined(this.min) || newValue >= this.min)
      && (!isDefined(this.max) || newValue <= this.max);
  }
}
