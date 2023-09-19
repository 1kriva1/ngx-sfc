import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IDropdownMenuItemModel {
    label: string;
    icon?: IconDefinition | null;
    image?: string | null;
    delimeter?: boolean;
    active?: boolean;
    value?: any;
    click?: (item: IDropdownMenuItemModel) => void;
}
