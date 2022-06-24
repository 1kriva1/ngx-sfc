import { SortingDirection } from "../../enums";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ISortingModel {
    enabled: boolean;
    active?: boolean;
    direction: SortingDirection;
    icons?: ISortingIcon[];
}

export interface ISortingIcon {
    direction: SortingDirection;
    icon: IconDefinition;
}