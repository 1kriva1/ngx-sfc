import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ITabModel {
    label?: string;
    icon?: IconDefinition;
    image?:string;
    selected?: boolean;
    disabled?: boolean;
    data: any;
}