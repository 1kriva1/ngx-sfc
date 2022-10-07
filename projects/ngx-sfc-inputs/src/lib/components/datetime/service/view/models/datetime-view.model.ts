import { DateTimeView } from "../../../datetime-input-view.enum";
import { DateTimeState } from "../enums/datetime-state.enum";

export interface IDateTimeViewModel {
    currentView: DateTimeView;
    previousView: DateTimeView | null;
    state: DateTimeState;
    event?: MouseEvent;
}