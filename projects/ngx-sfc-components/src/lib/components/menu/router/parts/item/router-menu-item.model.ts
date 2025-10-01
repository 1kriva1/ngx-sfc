import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IRouterMenuItemModel {
    id: string;
    label: string;
    selected?: boolean;
    icon?: IconDefinition;
    image?: string;
    click?: (item: IRouterMenuItemModel) => void;
}