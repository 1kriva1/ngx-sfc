import { DateTimeViewActionType } from "./enums/datetime-view.enum";

export interface IDateTimeViewEvent {
    type: DateTimeViewActionType;
    event?: MouseEvent;
}