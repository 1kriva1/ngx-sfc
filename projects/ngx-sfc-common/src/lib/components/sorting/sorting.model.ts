import { SortingDirection } from "../../enums";

export interface ISortingModel {
    enabled: boolean;
    active?: boolean;
    direction: SortingDirection;
    icons?: ISortingIcon[];
}

export interface ISortingIcon {
    direction: SortingDirection;
    icon: string
}