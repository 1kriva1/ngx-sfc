import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { UIClass } from '../../enums';

@Component({
  selector: 'sfc-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent {

  @Input()
  @HostBinding('class.' + UIClass.Open)
  open: boolean = false;

  @HostListener('click')
  onClick = () => this.open = !this.open;
}
