import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { CommonConstants, UIClass } from 'ngx-sfc-common';
import { IRouterMenuItemModel } from './router-menu-item.model';

@Component({
    selector: 'sfc-router-menu-item',
    templateUrl: './router-menu-item.component.html',
    styleUrls: ['./router-menu-item.component.scss']
})
export class RouterMenuItemComponent {

    @Input()
    item: IRouterMenuItemModel = { id: CommonConstants.EMPTY_STRING, label: CommonConstants.EMPTY_STRING, selected: false };

    @HostBinding('class.' + UIClass.Selected)
    get _selected(): boolean {
        return this.item.selected ?? false;
    }

    @HostListener('click')
    click(): void {
        if (this.item.click)
            this.item.click(this.item);
    }
}
