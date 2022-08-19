import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { isDefined, UIClass } from 'ngx-sfc-common';
import { INumberSpinnerModel } from './number-spinner.model';

@Component({
  selector: 'sfc-number-spinner',
  templateUrl: './number-spinner.component.html',
  styleUrls: ['./number-spinner.component.scss']
})
export class NumberSpinnerComponent {

  @Input()
  model: INumberSpinnerModel = {
    value: 0,
    fixedWidth: false,
    fixedActions: false,
    nextIcon: faAngleRight,
    prevIcon: faAngleLeft,
    step: 1,
    disabled: false
  }

  @HostBinding(`class.${UIClass.Fixed}`)
  get isFixedWidth(): boolean {
    return this.model.fixedWidth;
  }

  @HostBinding(`class.${UIClass.Fixed}-actions`)
  get isFixedActions(): boolean {
    return this.model.fixedActions;
  }

  @HostBinding(`class.${UIClass.Disabled}`)
  get isDisabled(): boolean {
    return this.model.disabled;
  }

  @Output()
  update = new EventEmitter<number>();

  get showNext(): boolean {
    return !isDefined(this.model.max) || this.nextValue <= (this.model.max || 0);
  }

  get showPrevious(): boolean {
    return !isDefined(this.model.min) || this.previousValue >= (this.model.min || 0);
  }

  private get nextValue(): number {
    return this.model.value + this.model.step;
  }

  private get previousValue(): number {
    return this.model.value - this.model.step;
  }

  increment(): void {
    this.update.emit(this.nextValue);
  }

  decrement(): void {
    this.update.emit(this.previousValue);
  }
}
