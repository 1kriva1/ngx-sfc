import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { isDefined, Sequence, UIClass, UIConstants } from 'ngx-sfc-common';
import { INumberSpinnerModel } from './number-spinner.model';

@Component({
  selector: 'sfc-number-spinner',
  templateUrl: './number-spinner.component.html',
  styleUrls: ['./number-spinner.component.scss']
})
export class NumberSpinnerComponent {

  Sequence = Sequence;

  @Input()
  model: INumberSpinnerModel = {
    value: 0,
    fixedWidth: false,
    fixedActions: false,
    nextIcon: faAngleRight,
    prevIcon: faAngleLeft,
    step: 1,
    edit: false,
    disabled: false,
    disableNext: false,
    disablePrevious: false
  };

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
    return !this.model.disableNext &&
      (!isDefined(this.model.max) || this.nextValue <= (this.model.max || 0));
  }

  get showPrevious(): boolean {
    return !this.model.disablePrevious &&
      (!isDefined(this.model.min) || this.previousValue >= (this.model.min || 0));
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

  getStyles(sequence: Sequence): any {
    const allow: boolean = (sequence == Sequence.Next ? this.showNext : this.showPrevious);

    return {
      cursor: allow ? UIClass.Pointer : UIClass.Default,
      pointerEvents: allow ? UIConstants.CSS_INITIAL : UIConstants.CSS_NONE
    };
  }
}
