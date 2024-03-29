import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IDefaultModalHeaderModel {
    text?: string;
    icon?: IconDefinition | null;
    showCloseIcon?: boolean;
}