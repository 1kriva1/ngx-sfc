import { DateTimeValueActionType } from "./datetime-value.enum";

export interface IDateTimeValueEvent {
    type: DateTimeValueActionType;
    value?: Date;
    parameter?: number;
}