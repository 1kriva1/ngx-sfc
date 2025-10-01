import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { empty } from "ngx-sfc-common";

export interface ISideMenuModel {
    open?: boolean;
    switch?: boolean | empty;
    label?: string | empty;
    items?: ISideMenuItemModel[];
}

export interface ISideMenuItemModel {
    label: string;
    active?: boolean;
    type: SideMenuItemType;
    id?: string | empty;    
    open?: boolean;    
    icon?: IconDefinition | empty;    
    items?: ISideMenuItemModel[];
    click?: (item: ISideMenuItemModel) => void;
}

export enum SideMenuItemType {
    Item = 'item',
    Title = 'title'
}
