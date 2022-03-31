import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { ISideMenuModel, SideMenuItemType } from 'ngx-sfc-components';

@Component({
    templateUrl: './menus-side-presentation.component.html',
    styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class MenusSidePresentationComponent {

    public ComponentSize = ComponentSize;

    selectedItem: string;

    MENU_MODEL: ISideMenuModel = {
        items: [
            {
                label: 'Football',
                icon: 'fa-solid fa-futbol',
                type: SideMenuItemType.Item,
                active: false,
                items: [
                    {
                        label: 'Find',
                        icon: 'fa-solid fa-magnifying-glass',
                        type: SideMenuItemType.Item,
                        active: false
                    },
                    {
                        label: 'Create',
                        icon: 'fa-solid fa-circle-plus',
                        type: SideMenuItemType.Item,
                        active: false,
                    },
                    {
                        label: 'View',
                        icon: 'fa-solid fa-mountain',
                        type: SideMenuItemType.Item,
                        active: false,
                    }
                ]
            },
            {
                label: 'Basketball',
                icon: 'fa-solid fa-basketball',
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Tennis',
                icon: 'fa-solid fa-table-tennis-paddle-ball',
                type: SideMenuItemType.Item,
                active: false,
                items: [
                    {
                        label: 'Find',
                        icon: 'fa-solid fa-magnifying-glass',
                        type: SideMenuItemType.Item,
                        active: false
                    },
                    {
                        label: 'Create',
                        icon: 'fa-solid fa-circle-plus',
                        type: SideMenuItemType.Item,
                        active: false,
                    },
                    {
                        label: 'View',
                        icon: 'fa-solid fa-mountain',
                        type: SideMenuItemType.Item,
                        active: false,
                    }
                ]
            },
            {
                label: 'Volleyball',
                icon: 'fa fa-volleyball',
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Cricket',
                icon: 'fa-solid fa-strikethrough',
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Rugby',
                icon: 'fa-solid fa-football',
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Boxing',
                icon: 'fa-solid fa-people-carry-box',
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Categories',
                type: SideMenuItemType.Title,
                icon: '',
                active: false
            },
            {
                label: 'Baseball',
                icon: 'fa-solid fa-baseball',
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Bowling',
                icon: 'fa-solid fa-bowling-ball',
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Hockey',
                icon: 'fa-solid fa-hockey-puck',
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Biking',
                icon: 'fa-solid fa-person-biking',
                type: SideMenuItemType.Item,
                active: false
            }
        ],
        open: false
    }

    MENU_MODEL_1: ISideMenuModel;

    MENU_MODEL_2: ISideMenuModel;

    MENU_MODEL_3: ISideMenuModel;

    MENU_MODEL_4: ISideMenuModel;

    constructor() {
        this.selectedItem = this.MENU_MODEL.items[1].label;

        this.MENU_MODEL_1 = JSON.parse(JSON.stringify(this.MENU_MODEL));
        if (this.MENU_MODEL_1.items[0] && this.MENU_MODEL_1.items[0].items)
            this.MENU_MODEL_1.items[0].items[1].active = true;

        this.MENU_MODEL_2 = JSON.parse(JSON.stringify(this.MENU_MODEL));
        this.MENU_MODEL_2.open = true;

        this.MENU_MODEL_3 = JSON.parse(JSON.stringify(this.MENU_MODEL));
        this.MENU_MODEL_4 = JSON.parse(JSON.stringify(this.MENU_MODEL));

        this.MENU_MODEL.items[1].active = true;
    }

    onSelect(item: any) {
        this.selectedItem = item.label;
    }
}
