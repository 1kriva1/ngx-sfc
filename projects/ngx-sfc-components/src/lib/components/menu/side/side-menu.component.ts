import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { any, isDefined, UIClass } from 'ngx-sfc-common';
import { SideMenuConstants } from './side-menu.constants';
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
  selected: EventEmitter<ISideMenuItemModel> = new EventEmitter<ISideMenuItemModel>();

  @HostBinding('class.' + UIClass.Open)
  get open(): boolean {
    return this.model.open || !this.switch;
  }

  set open(value: boolean) {
    this.model.open = value;
  }

  @HostBinding(`class.${SideMenuConstants.CSS_SWITCH_CLASS}`)
  get switch(): boolean {
    return isDefined(this.model.switch) ? this.model.switch! : true;
  }

  onItemSelect(item: ISideMenuItemModel) {
    // handle only items without childrens
    if (!any(item.items)) {
      this.model.items!.forEach((item) => {
        item.active = false;

        if (any(item.items))
          item.items?.forEach((item) => item.active = false);
      });

      item.active = true;
    }

    this.selected.emit(item);
  }
}
