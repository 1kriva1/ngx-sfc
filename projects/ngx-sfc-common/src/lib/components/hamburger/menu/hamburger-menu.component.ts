import { Component, Input } from '@angular/core';
import { HamburgerBaseComponent } from '../hamburger-base.component';

@Component({
  selector: 'sfc-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent extends HamburgerBaseComponent {

  @Input()
  label: string = 'Menu';
}
