import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { any, CommonConstants, firstOrDefault, isDefined, UIClass } from 'ngx-sfc-common';
import { ISideMenuItemModel, SideMenuItemType } from '../../side-menu.model';

@Component({
  selector: 'sfc-side-menu-item',
  templateUrl: './side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-20%)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('300ms', style({ transform: 'translateX(-20%)', opacity: 0 }))
      ])
    ]
    )
  ]
})
export class SideMenuItemComponent implements OnInit {

  @Input()
  item: ISideMenuItemModel = {
    icon: undefined,
    label: CommonConstants.EMPTY_STRING,
    type: SideMenuItemType.Item,
    items: [],
    active: false
  };

  @Input()
  @HostBinding('class.' + UIClass.Open)
  open: boolean = false;

  @Output()
  selectItem: EventEmitter<ISideMenuItemModel> = new EventEmitter<ISideMenuItemModel>();

  openParent: boolean = false;

  private get hasActiveChild() {
    return isDefined(firstOrDefault(this.item.items, (item: ISideMenuItemModel) => item.active));
  }

  hasChildren(item: ISideMenuItemModel) {
    return any(item.items);
  }

  isActive(item: ISideMenuItemModel) {
    return this.hasChildren(item)
      ? this.hasActiveChild && !this.openParent
      : item.active
  }

  ngOnInit() {
    this.openParent = this.hasActiveChild;
  }

  onParentClick(item: ISideMenuItemModel){
    this.openParent = !this.openParent;
    this.selectItem.emit(item);
  }

  onChildClick(item: ISideMenuItemModel, child: ISideMenuItemModel) {
    item.items?.forEach((item) => item.active = false);
    this.selectItem.emit(child);
  }
}
