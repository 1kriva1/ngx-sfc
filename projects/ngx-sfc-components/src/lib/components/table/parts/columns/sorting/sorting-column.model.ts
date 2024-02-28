import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SortingDirection } from 'ngx-sfc-common';

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