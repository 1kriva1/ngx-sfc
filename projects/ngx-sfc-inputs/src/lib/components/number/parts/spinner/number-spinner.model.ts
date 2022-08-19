import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface INumberSpinnerModel {
    value: number;
    fixedWidth: boolean;
    fixedActions: boolean;
    nextIcon: IconDefinition;
    prevIcon: IconDefinition;
    max?: number | null;
    min?: number | null;
    step: number;
    disabled: boolean;
}