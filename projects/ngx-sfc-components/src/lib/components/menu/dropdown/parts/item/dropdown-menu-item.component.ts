import { Component, HostListener, Input } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { IDropdownMenuModel } from './dropdown-menu.model';

@Component({
  selector: 'sfc-dropdown-menu-item',
  templateUrl: './dropdown-menu-item.component.html',
  styleUrls: ['./dropdown-menu-item.component.scss']
})
export class DropdownMenuItemComponent {

  @Input()
  item: IDropdownMenuModel = { label: CommonConstants.EMPTY_STRING };

  @HostListener('click')
  click() {
    if (this.item.click)
      this.item.click(this.item);
  }
}
