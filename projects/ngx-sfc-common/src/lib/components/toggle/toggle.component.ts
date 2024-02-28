import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { UIClass } from '../../enums';

@Component({
  selector: 'sfc-toggle',
  template: `<div class="container"><label></label></div>`,
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {

  @Input()
  @HostBinding('class.' + UIClass.Active)
  active: boolean = false;

  @Input()
  @HostBinding('class.' + UIClass.Disabled)
  disabled: boolean = false;

  @HostListener('click')
  onClick = () => this.active = !this.active;
}
