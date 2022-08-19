import { Component, Input } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IToggleSwitcherModel } from 'ngx-sfc-common';
import { BaseLogicalInputComponent } from '../base/logical/logical-input.component';

@Component({
  selector: 'sfc-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['../../styles/input.component.scss', '../../styles/vertical-input.component.scss']
})
export class ToggleInputComponent extends BaseLogicalInputComponent {

  @Input()
  leftModel: IToggleSwitcherModel = { label: '', icon: faTimes };

  @Input()
  rightModel: IToggleSwitcherModel = { label: '', icon: faCheck };
}
