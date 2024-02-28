import { empty } from "ngx-sfc-common";
import { DateTimeValueActionType } from "./datetime-value.enum";

export interface IDateTimeValueEvent {
    type: DateTimeValueActionType;
    value?: Date | empty;
    parameter?: number;
}