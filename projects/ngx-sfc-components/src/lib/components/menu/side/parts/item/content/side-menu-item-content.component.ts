import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { any, CommonConstants, hasItemBy, UIClass } from 'ngx-sfc-common';
import { ISideMenuItemModel, SideMenuItemType } from '../../../side-menu.model';
import { faAngleUp, faAngleDown, IconDefinition, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sfc-side-menu-item-content',
  templateUrl: './side-menu-item-content.component.html',
  styleUrls: ['./side-menu-item-content.component.scss']
})
export class SideMenuItemContentComponent {

  private readonly ANGLE_UP_ICON = faAngleUp;
  private readonly ANGLE_DOWM_ICON = faAngleDown;
  public readonly INVALID_ICON = faCircleExclamation

  @Input()
  item: ISideMenuItemModel = {
    id: CommonConstants.EMPTY_STRING,
    label: CommonConstants.EMPTY_STRING,
    icon: null,
    type: SideMenuItemType.Item,
    active: false,
    invalid: false
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
    this.selectItem.emit(this.item);

    if (this.item.click)
      this.item.click(this.item);
  }

  get expandIcon(): IconDefinition {
    return this.openParent ? this.ANGLE_UP_ICON : this.ANGLE_DOWM_ICON;
  }

  get invalidParent(): boolean {
    return this.hasChildren &&
      !this.openParent &&
      hasItemBy(this.item.items!, (item: ISideMenuItemModel) => item.invalid || false);
  }
}
