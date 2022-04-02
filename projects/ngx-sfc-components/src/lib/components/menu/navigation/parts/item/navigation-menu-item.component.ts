import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { CommonConstants, UIClass } from 'ngx-sfc-common';
import { INavigationMenuItemModel } from './navigation-menu-item.model';

@Component({
  selector: 'sfc-navigation-menu-item',
  templateUrl: './navigation-menu-item.component.html',
  styleUrls: ['./navigation-menu-item.component.scss']
})
export class NavigationMenuItemComponent {

  @Input()
  item: INavigationMenuItemModel = { label: CommonConstants.EMPTY_STRING, active: false };

  @HostBinding('class.' + UIClass.Active)
  get active(): boolean {
    return this.item.active;
  }

  @HostListener('click')
  click() {
    if (this.item.click)
      this.item.click(this.item);
  }
}
