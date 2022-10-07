import { WeekDay } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  any,
  ButtonType, CommonConstants, getFirstDayOfMonth, getFirstDayOfYear,
  getLastDayOfMonth, getLastDayOfYear,
  hasItemBy,
  isDateGreat, isDateGreatOrEqual, isDateTimeGreat, isDateTimeGreatOrEqual, isEqualDates
} from 'ngx-sfc-common';
import { combineLatest, map, Observable } from 'rxjs';
import { DateTimeInputConstants } from '../../constants/datetime.constants';
import { DateTimeValueActionType } from '../../service/value/datetime-value.enum';
import { DateTimeValueService } from '../../service/value/datetime-value.service';
import { DateTimeViewActionType } from '../../service/view/enums/datetime-view.enum';
import { IDateTimeViewModel } from '../../service/view/models/datetime-view.model';
import { DateTimeViewService } from '../../service/view/datetime-view.service';
import { DateTimeView } from '../../datetime-input-view.enum';
import { IDateTimeModalModel } from './datetime-modal.model';
import { DateTimeState } from '../../service/view/enums/datetime-state.enum';

@Component({
  selector: 'sfc-datetime-modal',
  templateUrl: './datetime-modal.component.html',
  styleUrls: ['./datetime-modal.component.scss'],

})
export class DateTimeModalComponent implements OnInit {

  CommonConstants = CommonConstants;
  ButtonType = ButtonType;
  DateTimeView = DateTimeView;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  @Input()
  date: boolean = true;

  @Input()
  time: boolean = true;

  @Input()
  year: boolean = true;

  @Input()
  shortTime: boolean = false;

  @Input()
  locale: string = DateTimeInputConstants.DEFAULT_LOCALE;

  @Input()
  minDate: Date | null = null;

  @Input()
  maxDate: Date | null = null;

  @Input()
  disabledDays: Date[] = [];

  @Input()
  weekStart: WeekDay = WeekDay.Monday;

  @Input()
  switchOnClick: boolean = false;

  @Input()
  clearButton = false;

  @Input()
  nowButton = false;

  @Output()
  update = new EventEmitter<Date | null>();

  model$!: Observable<IDateTimeModalModel>;

  constructor(public valueService: DateTimeValueService, public viewService: DateTimeViewService) { }

  ngOnInit(): void {
    this.model$ = combineLatest([
      this.valueService.value$,
      this.viewService.view$
    ]).pipe(
      map(([valueModel, viewModel]) => {
        this.finalize(viewModel);

        return {
          value: valueModel.value,
          hour: valueModel.hour,
          minute: valueModel.minute,
          day: valueModel.day,
          dayNumber: valueModel.dayNumber,
          month: valueModel.month,
          year: valueModel.year,
          yearNumber: valueModel.yearNumber,
          time: valueModel.time
        }
      })
    );
  }

  public get showMonthBefore(): boolean {
    if (this.minDate) {
      const firstDayOfMonth = getFirstDayOfMonth(this.valueService.value);
      return isDateGreatOrEqual(firstDayOfMonth, this.minDate);
    }

    return true;
  }

  public get showMonthAfter(): boolean {
    if (this.maxDate) {
      const lastDayOfMonth = getLastDayOfMonth(this.valueService.value);
      return !isDateGreatOrEqual(lastDayOfMonth, this.maxDate);
    }

    return true;
  }

  public get showYearBefore(): boolean {
    if (this.minDate) {
      const firstDayOfYear = getFirstDayOfYear(this.valueService.value);
      return isDateGreatOrEqual(firstDayOfYear, this.minDate);
    }

    return true;
  }

  public get showYearAfter(): boolean {
    if (this.maxDate) {
      const lastDayOfYear = getLastDayOfYear(this.valueService.value);
      return !isDateGreatOrEqual(lastDayOfYear, this.maxDate);
    }

    return true;
  }

  public get isDisabled(): boolean {
    let isDisabledByDate = false, isDisabledByMin = false, isDisabledByMax = false;
    const limits = this.getLimitsValues();

    if (any(this.disabledDays)) {
      isDisabledByDate = hasItemBy(this.disabledDays, (disabledDate: Date) => isEqualDates(disabledDate, limits.valueTocheck))
    }

    if (limits.minDateToCheck) {
      isDisabledByMin = this.time
        ? !isDateTimeGreatOrEqual(limits.valueTocheck, limits.minDateToCheck)
        : !isDateGreatOrEqual(limits.valueTocheck, limits.minDateToCheck);
    }

    if (limits.maxDateToCheck) {
      isDisabledByMax = this.time
        ? isDateTimeGreat(limits.valueTocheck, limits.maxDateToCheck)
        : isDateGreat(limits.valueTocheck, limits.maxDateToCheck);
    }

    return isDisabledByDate || isDisabledByMin || isDisabledByMax;
  }

  // YEARS

  showYearsList(): void {
    if(this.year)
      this.viewService.update({ type: DateTimeViewActionType.Years });
  }

  // END YEARS

  // YEAR AND MONTH HANDLERS

  onYearAfter(): void {
    this.valueService.update({ type: DateTimeValueActionType.YearAfter });
  }

  onYearBefore(): void {
    this.valueService.update({ type: DateTimeValueActionType.YearBefore });
  }

  onMonthBefore(): void {
    this.valueService.update({ type: DateTimeValueActionType.MonthBefore });
  }

  onMonthAfter(): void {
    this.valueService.update({ type: DateTimeValueActionType.MonthAfter });
  }

  // END YEAR AND MONTH HANDLERS

  // BUTTON EVENTS

  onOk(event: MouseEvent): void {
    this.viewService.update({ type: DateTimeViewActionType.Ok, event: event });
  }

  onCancel(event: MouseEvent): void {
    this.viewService.update({ type: DateTimeViewActionType.Cancel, event: event });
  }

  onNow(): void {
    this.valueService.update({ type: DateTimeValueActionType.Init, value: new Date() });
  }

  onClear(event: MouseEvent): void {
    this.valueService.update({ type: DateTimeValueActionType.Init, value: new Date() });
    this.viewService.update({ type: DateTimeViewActionType.Hide, event: event });
    this.update.emit(null);
  }

  onClose(event: MouseEvent | undefined): void {
    event?.stopPropagation();
  }

  // END BUTTON EVENTS

  private finalize(viewModel: IDateTimeViewModel) {
    if (viewModel.state == DateTimeState.Hide
      || viewModel.state == DateTimeState.Update) {
      this.onClose(viewModel.event);
    }

    if (viewModel.state == DateTimeState.Update)
      this.update.emit(this.valueService.value);
  }

  private getLimitsValues(): { valueTocheck: Date, minDateToCheck: Date | null, maxDateToCheck: Date | null } {
    let valueTocheck = new Date(this.valueService.value),
      minDateToCheck = null,
      maxDateToCheck = null;

    if (this.minDate)
      minDateToCheck = new Date(this.minDate);

    if (this.maxDate)
      maxDateToCheck = new Date(this.maxDate);

    if (this.viewService.view == DateTimeView.Calendar || this.viewService.view == DateTimeView.Hours) {
      valueTocheck.setMinutes(0);

      if (this.viewService.view == DateTimeView.Calendar)
        valueTocheck.setHours(0);

      if (minDateToCheck) {
        minDateToCheck.setMinutes(0);
        if (this.viewService.view == DateTimeView.Calendar)
          minDateToCheck.setHours(0);
      }

      if (maxDateToCheck) {
        maxDateToCheck.setMinutes(0);
        if (this.viewService.view == DateTimeView.Calendar)
          maxDateToCheck.setHours(0);
      }
    }

    return { valueTocheck, minDateToCheck, maxDateToCheck };
  }
}
