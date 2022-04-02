export interface INavigationMenuItemModel {
    label: string;
    active: boolean;
    icon?: string;
    click?: (item: INavigationMenuItemModel) => void;
}
