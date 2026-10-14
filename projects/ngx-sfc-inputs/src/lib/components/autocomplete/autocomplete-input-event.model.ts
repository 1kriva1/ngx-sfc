import { AutoCompleteInputEventType } from "./autocomplete-input-event-type.enum";

export interface IAutoCompleteInputEvent {
    type: AutoCompleteInputEventType;
    value: string;
}