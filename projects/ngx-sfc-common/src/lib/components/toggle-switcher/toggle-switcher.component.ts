import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { UIClass } from '../../enums';
import { IToggleSwitcherModel } from './toggle-switcher.model';

@Component({
  selector: 'sfc-toggle-switcher',
  templateUrl: './toggle-switcher.component.html',
  styleUrls: ['./toggle-switcher.component.scss']
})
export class ToggleSwitcherComponent {

  @Input()
  @HostBinding('class.' + UIClass.Active)
  active: boolean = false;

  @Input()
  @HostBinding('class.' + UIClass.Disabled)
  disabled: boolean = false;

  @Input()
  leftModel: IToggleSwitcherModel;

  @Input()
  rightModel: IToggleSwitcherModel;

  @Output()
  toggle: EventEmitter<boolean> = new EventEmitter<boolean>(this.active);

  @HostListener('click')
  onClick = () => {
    this.active = !this.active;
    this.toggle.emit(this.active);
  }

  constructor() {
    this.leftModel = { label: 'Left' };
    this.rightModel = { label: 'Right' };
  }
}
