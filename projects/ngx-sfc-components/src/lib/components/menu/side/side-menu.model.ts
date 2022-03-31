export interface ISideMenuModel {
    open: boolean;
    items: ISideMenuItemModel[];
}

export interface ISideMenuItemModel {
    active: boolean;
    label: string;
    icon: string;
    type: SideMenuItemType;
    items?: ISideMenuItemModel[];
}

export enum SideMenuItemType {
    Item = 'item',
    Title = 'title'
}
