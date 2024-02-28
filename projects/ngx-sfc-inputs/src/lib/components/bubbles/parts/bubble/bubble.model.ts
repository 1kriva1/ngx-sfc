import { empty } from 'ngx-sfc-common';
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IBubbleModel {
    key: number;
    label: string;
    icon?: IconDefinition | empty;
    imageSrc?: string | empty;
}

export interface IBubbleInnerModel extends IBubbleModel {
    active: boolean;
    disabled: boolean;
}