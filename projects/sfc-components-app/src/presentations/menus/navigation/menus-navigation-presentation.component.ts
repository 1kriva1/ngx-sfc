import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { INavigationMenuItemModel } from 'ngx-sfc-components';

@Component({
    templateUrl: './menus-navigation-presentation.component.html',
    styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class MenusNavigationPresentationComponent {

    ComponentSize = ComponentSize;

    readonly MODEL: INavigationMenuItemModel[] = [
        {
            label: 'Photos/Videos',
            icon: 'fas fa-star',
            active: false
        },
        {
            label: 'Products',
            icon: 'fab fa-line',
            active: false
        },
        {
            label: 'Services',
            icon: 'fas fa-chart-pie',
            active: false,
            click: () => { alert('Cliciked button action: Services'); }
        },
        {
            label: 'Coupouns',
            icon: 'fab fa-discourse',
            active: false
        },
        {
            label: 'User Reviews',
            icon: 'fas fa-user-friends',
            active: false
        },
        {
            label: 'Subscription',
            icon: 'fas fa-newspaper',
            active: false
        },
        {
            label: 'Stats',
            icon: 'fas fa-calendar',
            active: false
        },
        {
            label: 'Delete Business',
            icon: 'fas fa-trash',
            active: false
        }
    ];

    readonly MODEL_SELECTED: INavigationMenuItemModel[];

    readonly MODEL_ONE: INavigationMenuItemModel[];

    readonly MODEL_TWO: INavigationMenuItemModel[];

    readonly MODEL_THREE: INavigationMenuItemModel[];

    constructor() {
        this.MODEL_ONE = JSON.parse(JSON.stringify(this.MODEL.slice(0, 1)));

        this.MODEL_TWO = JSON.parse(JSON.stringify(this.MODEL.slice(0, 2)));

        this.MODEL_THREE = JSON.parse(JSON.stringify(this.MODEL.slice(0, 3)));

        this.MODEL_SELECTED = JSON.parse(JSON.stringify(this.MODEL));
        this.MODEL_SELECTED[4].active = true;
    }

    onSelect(item: INavigationMenuItemModel) {
        alert('Cliciked: ' + item.label);
    }
}
