import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { UIClass } from '../../enums';
import { faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CheckmarkType } from './checkmark-type.enum';

@Component({
  selector: 'sfc-checkmark',
  templateUrl: './checkmark.component.html',
  styleUrls: ['./checkmark.component.scss']
})
export class CheckmarkComponent {

  @Input()
  @HostBinding('class.' + UIClass.Active)
  active: boolean = false;

  @Input()
  @HostBinding('class.' + UIClass.Disabled)
  disabled: boolean = false;

  @Input()
  icon: IconDefinition = faCheck;

  @Input()
  @HostBinding('class')
  type: CheckmarkType = CheckmarkType.Rounded;

  @Input()
  showNotActive: boolean = true;

  @HostListener('click')
  onClick = () => this.active = !this.active;
}
