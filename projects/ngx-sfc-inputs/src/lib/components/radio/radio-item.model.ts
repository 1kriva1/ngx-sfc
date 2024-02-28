import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IRadioItemModel {
    value: any | null;
    label: string;
    icon?: IconDefinition;
    default?: boolean;
    disabled?: boolean;
}