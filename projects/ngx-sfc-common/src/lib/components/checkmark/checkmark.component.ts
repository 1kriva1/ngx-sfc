import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { UIClass } from '../../enums';

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
  icon?: string = 'fa fa-check';

  @HostListener('click')
  onClick = () => this.active = !this.active;

}
