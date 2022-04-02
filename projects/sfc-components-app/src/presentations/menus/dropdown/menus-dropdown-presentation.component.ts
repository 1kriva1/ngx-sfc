import { Component } from '@angular/core';
import { ComponentSize, Position } from 'ngx-sfc-common';
import { IDropdownMenuItemModel } from 'ngx-sfc-components';

@Component({
    templateUrl: './menus-dropdown-presentation.component.html',
    styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class MenusDropdownPresentationComponent {

    ComponentSize = ComponentSize;

    Position = Position;

    readonly MODEL: IDropdownMenuItemModel[] = [
        {
            label: 'Photos/Videos',
            icon: 'fas fa-star'
        },
        {
            label: 'Products',
            icon: 'fab fa-line'
        },
        {
            label: 'Services',
            icon: 'fas fa-chart-pie',
            click: () => { alert('Cliciked button action: Services'); }
        },
        {
            label: 'Coupouns',
            icon: 'fab fa-discourse'
        },
        {
            label: 'User Reviews',
            icon: 'fas fa-user-friends',
            delimeter: false
        },
        {
            label: 'Subscription',
            icon: 'fas fa-newspaper'
        },
        {
            label: 'Stats',
            icon: 'fas fa-calendar',
            delimeter: false
        },
        {
            label: 'Delete Business',
            icon: 'fas fa-trash'
        }
    ];

    readonly MODEL_ONE: IDropdownMenuItemModel[];

    readonly MODEL_TWO: IDropdownMenuItemModel[];

    readonly MODEL_THREE: IDropdownMenuItemModel[];

    constructor() {
        this.MODEL_ONE = this.MODEL.slice(0, 1);

        this.MODEL_TWO = this.MODEL.slice(0, 2);

        this.MODEL_THREE = this.MODEL.slice(0, 1);
        this.MODEL_THREE.push({
            label: 'Services',
            icon: 'fas fa-chart-pie',
            delimeter: true
        });
        this.MODEL_THREE.push({
            label: 'Coupouns',
            icon: 'fab fa-discourse'
        });
    }

    onSelect(item: IDropdownMenuItemModel) {
        alert('Cliciked: ' + item.label);
    }
}
