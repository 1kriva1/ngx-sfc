import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { any, UIClass } from 'ngx-sfc-common';
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from './side-menu.model';

@Component({
  selector: 'sfc-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  SideMenuItemType = SideMenuItemType;

  @Input()
  model: ISideMenuModel = { open: false, items: [] };

  @Output()
  selectItem: EventEmitter<ISideMenuItemModel> = new EventEmitter<ISideMenuItemModel>();

  @HostBinding('class.' + UIClass.Open)
  get open(): boolean {
    return this.model.open;
  }

  set open(value: boolean) {
    this.model.open = value;
  }

  onItemSelect(item: ISideMenuItemModel) {
    // handle only items without childrens
    if (!any(item.items)) {
      this.model.items.forEach((item) => {
        item.active = false;

        if (any(item.items))
          item.items?.forEach((item) => item.active = false);
      });

      item.active = true;
    }

    this.selectItem.emit(item);
  }
}
