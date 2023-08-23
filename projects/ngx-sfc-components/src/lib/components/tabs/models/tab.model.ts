import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ITabModel {
    label?: string;
    icon?: IconDefinition;
    selected?: boolean;
    disabled?: boolean;
    data: any;
}