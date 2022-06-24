import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface INavigationMenuItemModel {
    label: string;
    active: boolean;
    icon?: IconDefinition;
    click?: (item: INavigationMenuItemModel) => void;
}
