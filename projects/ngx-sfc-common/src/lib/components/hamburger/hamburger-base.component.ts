import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { UIClass } from '../../enums';

@Directive()
export abstract class HamburgerBaseComponent {

  @Input()
  @HostBinding('class.' + UIClass.Open)
  open: boolean = false;

  @HostListener('click')
  onClick = () => this.open = !this.open;
}
