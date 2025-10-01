import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { CommonConstants, UIClass } from 'ngx-sfc-common';
import { IDropdownMenuItemModel } from './dropdown-menu-item.model';

@Component({
  selector: 'sfc-dropdown-menu-item',
  templateUrl: './dropdown-menu-item.component.html',
  styleUrls: ['./dropdown-menu-item.component.scss']
})
export class DropdownMenuItemComponent {

  /* Inputs */

  @Input()
  item: IDropdownMenuItemModel = { label: CommonConstants.EMPTY_STRING };

  /* End Inputs */

  /* Host bindings */

  @HostBinding(`class.${UIClass.Active}`)
  private get _active(): boolean { return this.item.active || false; }

  /* End Host bindings */

  /* Host listeners */

  @HostListener('click')
  click(): void {
    if (this.item.click)
      this.item.click(this.item);
  }

  /* End Host listeners */
}
