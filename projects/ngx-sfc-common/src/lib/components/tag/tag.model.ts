import { empty } from '../../types';
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface ITagModel {
    label: string;
    key?: any | empty;
    args?: any;
    icon?: IconDefinition | empty;
    imageSrc?: string | empty;
    allowRemove?: boolean;
    click?: (model: ITagModel) => void | empty;
}