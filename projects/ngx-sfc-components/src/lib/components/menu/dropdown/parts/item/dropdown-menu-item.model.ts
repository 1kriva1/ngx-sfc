import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IDropdownMenuItemModel {
    label: string;
    icon?: IconDefinition;
    image?: string;
    delimeter?: boolean;
    active?: boolean;
    click?: (item: IDropdownMenuItemModel) => void;
}
