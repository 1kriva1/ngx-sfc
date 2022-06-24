import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { INavigationMenuItemModel } from 'ngx-sfc-components';
import { faStar, faChartLine, faChartPie, faDisplay, faUserFriends, faNewspaper, faCalendar, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    templateUrl: './menus-navigation-presentation.component.html',
    styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class MenusNavigationPresentationComponent {

    ComponentSize = ComponentSize;

    readonly MODEL: INavigationMenuItemModel[] = [
        {
            label: 'Photos/Videos',
            icon: faStar,
            active: false
        },
        {
            label: 'Products',
            icon: faChartLine,
            active: false
        },
        {
            label: 'Services',
            icon: faChartPie,
            active: false,
            click: () => { alert('Cliciked button action: Services'); }
        },
        {
            label: 'Coupouns',
            icon: faDisplay,
            active: false
        },
        {
            label: 'User Reviews',
            icon: faUserFriends,
            active: false
        },
        {
            label: 'Subscription',
            icon: faNewspaper,
            active: false
        },
        {
            label: 'Stats',
            icon: faCalendar,
            active: false
        },
        {
            label: 'Delete Business',
            icon: faTrash,
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
