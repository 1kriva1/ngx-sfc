import { formatDate, FormStyle, getLocaleDayNames, TranslationWidth, WeekDay } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  any, DateTimeConstants, getFirstDayOfMonthByYearAndMonth, getLastDayOfMonthByYearAndMonth, getWeeksNumberInMonth,
  hasItemBy, isDateGreat, isDateGreatOrEqual, isEqualDates
} from 'ngx-sfc-common';
import { DateTimeInputConstants } from '../../constants/datetime.constants';
import { DateTimeFormatsConstants } from '../../constants/formats.constants';
import { IDateTimeState } from '../../models/datetime-input-state.model';
import { DateTimeValueActionType } from '../../service/value/datetime-value.enum';
import { DateTimeValueService } from '../../service/value/datetime-value.service';
import { DateTimeViewService } from '../../service/view/datetime-view.service';
import { DateTimeViewActionType } from '../../service/view/enums/datetime-view.enum';
import { IDateTimeCalendarModel } from './datetime-calendar.model';

@Component({
  selector: 'sfc-datetime-calendar',
  templateUrl: './datetime-calendar.component.html',
  styleUrls: ['./datetime-calendar.component.scss']
})
export class DateTimeCalendarComponent implements OnInit {

  DateTimeConstants = DateTimeConstants;

  @Input()
  locale: string = DateTimeInputConstants.DEFAULT_LOCALE;

  @Input()
  weekStart: WeekDay = WeekDay.Monday;

  @Input()
  switchOnClick: boolean = false;

  @Input()
  minDate: Date | null = null;

  @Input()
  maxDate: Date | null = null;

  @Input()
  disabledDays: Date[] = [];

  @Input()
  set currentDate(value: Date) {
    this.initCalendar(value);
  }

  model: IDateTimeCalendarModel = { weeks: [], weekDays: [] };

  get calendarMonth(): string {
    return formatDate(this.valueService.value, DateTimeFormatsConstants.CALENDAR_MONTH_FORMAT, this.locale);
  };

  public dayNames!: readonly string[];

  constructor(public valueService: DateTimeValueService, public viewService: DateTimeViewService) { }

  ngOnInit(): void {
    this.dayNames = getLocaleDayNames(this.locale, FormStyle.Format, TranslationWidth.Abbreviated);
  }

  getDateNumber(date: Date): string {
    return formatDate(date, DateTimeFormatsConstants.PREFIX_DAY_NUMBER_FORMAT, this.locale);
  }

  getDateState(date: Date): IDateTimeState {
    const isDisabled = this.isDisabled(date);
    return {
      disabled: isDisabled,
      selected: !isDisabled && isEqualDates(date, this.valueService.value)
    };
  }

  onSelectDate(event: MouseEvent, date: Date): void {
    if (!isEqualDates(date, this.valueService.currentValue as Date)) {
      this.valueService.update({ type: DateTimeValueActionType.Date, value: date });

      if (this.switchOnClick)
        this.viewService.update({ type: DateTimeViewActionType.Date, event: event });
    }
  }

  private isDisabled(date: Date): boolean {
    return (this.minDate && !isDateGreatOrEqual(date, this.minDate))
      || (this.maxDate && isDateGreat(date, this.maxDate))
      || (hasItemBy(this.disabledDays, (disabledDate: Date) => isEqualDates(disabledDate, date)));
  }

  private initCalendar(date: Date): void {
    this.model.weeks = [];

    const year = date.getFullYear(),
      month = date.getMonth(),
      firstDayOfMonth = getFirstDayOfMonthByYearAndMonth(year, month),
      lastDayOfMonth = getLastDayOfMonthByYearAndMonth(year, month),
      dayOfWeek = firstDayOfMonth.getDay(),
      weekCount = getWeeksNumberInMonth(date),
      days: Array<Date | null> = [];

    this.model.weekDays = this.getDaysInWeek();

    for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
      if (i === firstDayOfMonth.getDate()) {
        const iWeek = this.model.weekDays.indexOf(dayOfWeek);
        if (iWeek > 0) {
          for (let x = 0; x < iWeek; x++) {
            days.push(null);
          }
        }
      }

      const nextDate = new Date(firstDayOfMonth);
      nextDate.setDate(i);
      days.push(nextDate);
    }

    for (let weekIndex = 0; weekIndex < weekCount; weekIndex++) {
      const daysInWeek = days.slice(weekIndex * DateTimeConstants.DAYS_IN_WEEK, (weekIndex + 1) * DateTimeConstants.DAYS_IN_WEEK);

      if (any(daysInWeek)) {
        this.model.weeks.push(daysInWeek);
      }
    }
  }

  private getDaysInWeek() {
    const days = [];
    for (var i = this.weekStart; days.length < DateTimeConstants.DAYS_IN_WEEK; i++) {
      if (i > 6) {
        i = 0;
      }
      days.push(i);
    }

    return days;
  }
}