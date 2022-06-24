import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface ISideMenuModel {
    open: boolean;
    items: ISideMenuItemModel[];
}

export interface ISideMenuItemModel {
    active: boolean;
    label: string;
    icon?: IconDefinition;
    type: SideMenuItemType;
    items?: ISideMenuItemModel[];
}

export enum SideMenuItemType {
    Item = 'item',
    Title = 'title'
}
