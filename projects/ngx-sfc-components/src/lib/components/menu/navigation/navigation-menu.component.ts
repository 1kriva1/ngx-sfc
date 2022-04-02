import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INavigationMenuItemModel } from './parts/item/navigation-menu-item.model';

@Component({
  selector: 'sfc-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent {

  @Input()
  items: INavigationMenuItemModel[] = [];

  @Output()
  selected: EventEmitter<INavigationMenuItemModel> = new EventEmitter<INavigationMenuItemModel>();

  onClick(item: INavigationMenuItemModel) {
    this.items.forEach((item) => item.active = false);
    item.active = true;
    this.selected.emit(item);
  }
}
