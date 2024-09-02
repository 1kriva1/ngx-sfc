import { Component, HostBinding, Input } from '@angular/core';
import { UIClass } from '../../enums';

@Component({
  selector: 'sfc-dot',
  template: ``,
  styleUrls: ['./dot.component.scss']
})
export class DotComponent {

  @Input()
  @HostBinding('class.' + UIClass.Active)
  active: boolean = false;

  @Input()
  @HostBinding('class.' + UIClass.Disabled)
  disabled: boolean = false;
}