export interface IDropdownMenuModel {
    label: string;
    icon?: string;
    delimeter?: boolean;
    click?: (item: IDropdownMenuModel) => void;
}
