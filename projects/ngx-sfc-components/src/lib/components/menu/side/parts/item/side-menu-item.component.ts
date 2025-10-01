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
    id: CommonConstants.EMPTY_STRING,
    label: CommonConstants.EMPTY_STRING,
    icon: null,
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

  private get hasActiveChild(): boolean {
    return isDefined(firstOrDefault(this.item.items, (item: ISideMenuItemModel) => item.active || false));
  }

  public hasChildren(item: ISideMenuItemModel): boolean {
    return any(item.items);
  }

  public isActive(item: ISideMenuItemModel): boolean {
    return this.hasChildren(item)
      ? this.hasActiveChild && !this.openParent
      : item.active || false
  }

  ngOnInit(): void {
    this.openParent = this.hasActiveChild || (this.item.open || false);
  }

  public onParentClick(item: ISideMenuItemModel): void {
    this.openParent = !this.openParent;
    this.selectItem.emit(item);
  }

  public onChildClick(item: ISideMenuItemModel, child: ISideMenuItemModel): void {
    item.items?.forEach((item) => item.active = false);
    this.selectItem.emit(child);
  }
}
