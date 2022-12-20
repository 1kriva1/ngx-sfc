import { map, Observable, Subject, startWith } from 'rxjs';
import { DateTimeViewActionType } from './enums/datetime-view.enum';
import { IDateTimeViewEvent } from './datetime-view.event';
import { IDateTimeViewModel } from './models/datetime-view.model';
import { DateTimeState } from './enums/datetime-state.enum';
import { IDateTimeViewInitModel } from './models/datetime-view-init.model';
import { DateTimeView } from '../../datetime-input-view.enum';

export class DateTimeViewService {
    private model: IDateTimeViewModel = {
        currentView: DateTimeView.Calendar,
        previousView: null,
        state: DateTimeState.Undefined
    }
    private initModel!: IDateTimeViewInitModel;
    private subject: Subject<IDateTimeViewEvent> = new Subject<IDateTimeViewEvent>();

    public get view(): DateTimeView { return this.model.currentView; }

    public view$!: Observable<IDateTimeViewModel>;

    init(initModel: IDateTimeViewInitModel = { date: true, time: true }): void {
        this.initModel = initModel;

        this.view$ = this.subject.asObservable()
            .pipe(
                startWith({ type: DateTimeViewActionType.Init }),
                map((event: IDateTimeViewEvent) => {
                    this.model.state = DateTimeState.Undefined;
                    this.model.event = event.event;

                    switch (event.type) {
                        case DateTimeViewActionType.Init:
                            this.onInit();
                            break;
                        case DateTimeViewActionType.Date:
                            this.onDate();
                            break;
                        case DateTimeViewActionType.Hour:
                            this.onHour();
                            break;
                        case DateTimeViewActionType.Minute:
                            this.onMinute();
                            break;
                        case DateTimeViewActionType.Year:
                            this.onYear();
                            break;
                        case DateTimeViewActionType.Years:
                            this.onYears();
                            break;
                        case DateTimeViewActionType.Ok:
                            this.onOk();
                            break;
                        case DateTimeViewActionType.Cancel:
                            this.onCancel();
                            break;
                        case DateTimeViewActionType.RefreshState:
                            break;
                        case DateTimeViewActionType.Hide:
                            this.model.state = DateTimeState.Hide;
                            break;
                    }

                    return this.model;
                })
            );
    }

    update(event: IDateTimeViewEvent): void {
        this.subject.next(event);
    }

    private onInit(): void {
        if (this.initModel.date)
            this.model.currentView = DateTimeView.Calendar;
        else if (this.initModel.time)
            this.model.currentView = DateTimeView.Hours;
        else
            this.model.currentView = DateTimeView.Years;
    }

    private onYears(): void {
        if (this.model.currentView === DateTimeView.Years) {
            this.model.currentView = this.model.previousView as DateTimeView;
        } else {
            this.model.previousView = this.model.currentView;
            this.model.currentView = DateTimeView.Years;
        }
    }

    private onYear(): void {
        this.model.currentView = this.model.previousView as DateTimeView;
    }

    private onDate(): void {
        if (this.initModel.time)
            this.model.currentView = DateTimeView.Hours;
        else
            this.model.state = DateTimeState.Update;
    }

    private onHour(): void {
        this.model.currentView = DateTimeView.Minutes;
    }

    private onMinute(): void {
        this.model.currentView = this.initModel.date ? DateTimeView.Calendar : DateTimeView.Hours;
        this.model.state = DateTimeState.Update;
    }

    private onOk(): void {
        if (this.model.currentView === DateTimeView.Calendar) {
            this.onDate();
        } else if (this.model.currentView === DateTimeView.Hours) {
            this.onHour();
        } else if (this.model.currentView === DateTimeView.Minutes) {
            this.onMinute();
        } else if (this.model.currentView === DateTimeView.Years) {
            this.model.currentView = this.model.previousView as DateTimeView;
        } else
            this.model.state = DateTimeState.Update;
    }

    private onCancel(): void {
        if (this.model.currentView === DateTimeView.Calendar) {
            this.model.state = DateTimeState.Hide;
        } else if (this.model.currentView === DateTimeView.Hours) {
            if (this.initModel.date)
                this.model.currentView = DateTimeView.Calendar;
            else
                this.model.state = DateTimeState.Hide;
        } else if (this.model.currentView === DateTimeView.Minutes) {
            this.model.currentView = DateTimeView.Hours;
        } else if (this.model.currentView === DateTimeView.Years) {
            this.model.currentView = this.model.previousView as DateTimeView;
        } else
            this.model.state = DateTimeState.Hide;
    }
}
