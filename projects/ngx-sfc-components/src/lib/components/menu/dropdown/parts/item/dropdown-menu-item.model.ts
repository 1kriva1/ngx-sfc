export interface IDropdownMenuItemModel {
    label: string;
    icon?: string;
    delimeter?: boolean;
    click?: (item: IDropdownMenuItemModel) => void;
}
