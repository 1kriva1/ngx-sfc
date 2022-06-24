import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { CommonConstants, UIClass } from 'ngx-sfc-common';
import { ISideMenuItemModel, SideMenuItemType } from '../../../side-menu.model';
import { faAngleUp, faAngleDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sfc-side-menu-item-content',
  templateUrl: './side-menu-item-content.component.html',
  styleUrls: ['./side-menu-item-content.component.scss']
})
export class SideMenuItemContentComponent {

  private readonly ANGLE_UP_ICON = faAngleUp;
  private readonly ANGLE_DOWM_ICON = faAngleDown;

  @Input()
  item: ISideMenuItemModel = {
    icon: undefined,
    label: CommonConstants.EMPTY_STRING,
    type: SideMenuItemType.Item,
    active: false
  };

  @Input()
  @HostBinding('class.' + UIClass.Active)
  active: boolean = false;

  @Input()
  @HostBinding('class.' + UIClass.Open)
  open: boolean = false;

  @Input()
  openParent: boolean = false;

  @Input()
  hasChildren: boolean = false;

  @Output()
  selectItem: EventEmitter<ISideMenuItemModel> = new EventEmitter<ISideMenuItemModel>();

  @HostListener('click')
  onClick() {
    this.selectItem.emit(this.item)
  }

  get expandIcon(): IconDefinition {
    return this.openParent ? this.ANGLE_UP_ICON : this.ANGLE_DOWM_ICON;
  }
}
