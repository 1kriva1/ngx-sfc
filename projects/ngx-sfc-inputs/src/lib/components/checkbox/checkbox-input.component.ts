import { Component, Input } from '@angular/core';
import { CheckmarkType } from 'ngx-sfc-common';
import BaseInputComponent from '../base/base-input.component';

@Component({
  selector: 'sfc-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './checkbox-input.component.scss']
})
export class CheckboxInputComponent extends BaseInputComponent<boolean> {

  @Input()
  checkmarkType: CheckmarkType = CheckmarkType.Square;

  get labelValue(): string {
    return this.label || this.placeholder;
  }
}
