import { Component, Input } from '@angular/core';
import { CheckmarkType } from 'ngx-sfc-common';
import { BaseLogicalInputComponent } from '../base/logical/logical-input.component';

@Component({
  selector: 'sfc-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['../../styles/input.component.scss', '../../styles/vertical-input.component.scss']
})
export class CheckboxInputComponent extends BaseLogicalInputComponent {

  @Input()
  checkmarkType: CheckmarkType = CheckmarkType.Square;
}
