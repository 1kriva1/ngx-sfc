import { Component } from '@angular/core';
import { HamburgerBaseComponent } from '../hamburger-base.component';

@Component({
  selector: 'sfc-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent extends HamburgerBaseComponent { }
