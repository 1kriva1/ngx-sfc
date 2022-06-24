import { Component } from '@angular/core';
import { ComponentSize, Position } from 'ngx-sfc-common';
import { IDropdownMenuItemModel } from 'ngx-sfc-components';
import { faStar, faChartLine, faChartPie, faDisplay, faUserFriends, faNewspaper, faCalendar, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    templateUrl: './menus-dropdown-presentation.component.html',
    styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class MenusDropdownPresentationComponent {

    ComponentSize = ComponentSize;

    Position = Position;

    faStar= faStar;

    readonly MODEL: IDropdownMenuItemModel[] = [
        {
            label: 'Photos/Videos',
            icon: faStar
        },
        {
            label: 'Products',
            icon: faChartLine
        },
        {
            label: 'Services',
            icon: faChartPie,
            click: () => { alert('Cliciked button action: Services'); }
        },
        {
            label: 'Coupouns',
            icon: faDisplay
        },
        {
            label: 'User Reviews',
            icon: faUserFriends,
            delimeter: false
        },
        {
            label: 'Subscription',
            icon: faNewspaper
        },
        {
            label: 'Stats',
            icon: faCalendar,
            delimeter: false
        },
        {
            label: 'Delete Business',
            icon: faTrash
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
            icon: faChartPie,
            delimeter: true
        });
        this.MODEL_THREE.push({
            label: 'Coupouns',
            icon: faDisplay
        });
    }

    onSelect(item: IDropdownMenuItemModel) {
        alert('Cliciked: ' + item.label);
    }
}
