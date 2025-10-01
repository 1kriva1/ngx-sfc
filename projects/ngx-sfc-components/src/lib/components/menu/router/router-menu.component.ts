import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { all } from 'ngx-sfc-common';
import { IRouterMenuItemModel } from './parts/item/router-menu-item.model';

@Component({
    selector: 'sfc-router-menu',
    templateUrl: './router-menu.component.html',
    styleUrls: ['./router-menu.component.scss']
})
export class RouterMenuComponent implements OnInit {

    @Input()
    items: IRouterMenuItemModel[] = [];

    @Output()
    selected: EventEmitter<IRouterMenuItemModel> = new EventEmitter<IRouterMenuItemModel>();

    ngOnInit(): void {
        if (all(this.items, (item: IRouterMenuItemModel) => !(item.selected ?? false))) {
            this.items[0].selected = true;
        }
    }

    public onClick(item: IRouterMenuItemModel): void {
        this.items.forEach((item: IRouterMenuItemModel) => item.selected = false);
        item.selected = true;
        this.selected.emit(item);
    }
}
