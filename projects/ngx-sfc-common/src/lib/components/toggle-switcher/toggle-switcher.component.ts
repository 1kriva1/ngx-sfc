import { Component, HostBinding, HostListener, Input } from '@angular/core';
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
  leftModel: IToggleSwitcherModel;

  @Input()
  rightModel: IToggleSwitcherModel;

  @HostListener('click')
  onClick = () => this.active = !this.active;

  constructor() {
    this.leftModel = { label: 'Left' };
    this.rightModel = { label: 'Right' };
  }
}
