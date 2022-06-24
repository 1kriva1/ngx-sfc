import { Component } from '@angular/core';
import { ComponentSize } from 'ngx-sfc-common';
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from 'ngx-sfc-components';
import {
    faFootball, faMagnifyingGlass, faCirclePlus, faMountain, faBasketball, faTableTennisPaddleBall,
    faVolleyball, faStrikethrough, faFootballBall, faPeopleCarryBox, faBaseball, faBowlingBall,
    faHockeyPuck, faPersonBiking
} from '@fortawesome/free-solid-svg-icons';

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
                icon: faFootball,
                type: SideMenuItemType.Item,
                active: false,
                items: [
                    {
                        label: 'Find',
                        icon: faMagnifyingGlass,
                        type: SideMenuItemType.Item,
                        active: false
                    },
                    {
                        label: 'Create',
                        icon: faCirclePlus,
                        type: SideMenuItemType.Item,
                        active: false,
                    },
                    {
                        label: 'View',
                        icon: faMountain,
                        type: SideMenuItemType.Item,
                        active: false,
                    }
                ]
            },
            {
                label: 'Basketball',
                icon: faBasketball,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Tennis',
                icon: faTableTennisPaddleBall,
                type: SideMenuItemType.Item,
                active: false,
                items: [
                    {
                        label: 'Find',
                        icon: faMagnifyingGlass,
                        type: SideMenuItemType.Item,
                        active: false
                    },
                    {
                        label: 'Create',
                        icon: faCirclePlus,
                        type: SideMenuItemType.Item,
                        active: false,
                    },
                    {
                        label: 'View',
                        icon: faMountain,
                        type: SideMenuItemType.Item,
                        active: false,
                    }
                ]
            },
            {
                label: 'Volleyball',
                icon: faVolleyball,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Cricket',
                icon: faStrikethrough,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Rugby',
                icon: faFootballBall,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Boxing',
                icon: faPeopleCarryBox,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Categories',
                type: SideMenuItemType.Title,
                icon: undefined,
                active: false
            },
            {
                label: 'Baseball',
                icon: faBaseball,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Bowling',
                icon: faBowlingBall,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Hockey',
                icon: faHockeyPuck,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Biking',
                icon: faPersonBiking
                ,
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

    onSelect(item: ISideMenuItemModel) {
        this.selectedItem = item.label;
    }
}
