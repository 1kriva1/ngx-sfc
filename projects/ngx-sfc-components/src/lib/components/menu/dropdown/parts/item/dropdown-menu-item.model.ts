import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IDropdownMenuItemModel {
    label: string;
    icon?: IconDefinition;
    delimeter?: boolean;
    click?: (item: IDropdownMenuItemModel) => void;
}
