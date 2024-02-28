import { Component, Input } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonConstants, IToggleSwitcherModel } from 'ngx-sfc-common';
import { BaseLogicalInputComponent } from '../base/logical/logical-input.component';
import { ToggleType } from './toggle-type.enum';

@Component({
  selector: 'sfc-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['./toggle-input.component.scss',
    '../../styles/input.component.scss',
    '../../styles/vertical-input.component.scss']
})
export class ToggleInputComponent extends BaseLogicalInputComponent {

  ToggleType = ToggleType;

  @Input()
  toggleType: ToggleType = ToggleType.Complex;

  @Input()
  leftModel: IToggleSwitcherModel = { label: CommonConstants.EMPTY_STRING, icon: faTimes };

  @Input()
  rightModel: IToggleSwitcherModel = { label: CommonConstants.EMPTY_STRING, icon: faCheck };
}
