import { formatDate } from '@angular/common';
import {
  any, CommonConstants, DateTimeConstants, getNextDate, getNextMonth, getNextYear,
  getPreviousMonth, getPreviousYear, hasItemBy, isEqualDates, setDefaultSecondsAndMiliseconds,
  setHours, setMinutes, setYear
} from 'ngx-sfc-common';
import { map, Observable, startWith, Subject } from 'rxjs';
import { DateTimeInputConstants } from '../../constants/datetime.constants';
import { DateTimeFormatsConstants } from '../../constants/formats.constants';
import { DateTimeValueActionType } from './datetime-value.enum';
import { IDateTimeValueEvent } from './datetime-value.event';
import { IDateTimeValueInitModel } from './models/datetime-value-init.model';
import { IDateTimeValueModel } from './models/datetime-value.model';

export class DateTimeValueService {

  private model: IDateTimeValueInitModel = {
    date: true,
    time: true,
    shortTime: false,
    value: new Date(),
    currentValue: null,
    format: CommonConstants.EMPTY_STRING,
    locale: DateTimeConstants.DEFAULT_LOCALE,
    disabledDays: []
  };

  private subject: Subject<IDateTimeValueEvent> = new Subject<IDateTimeValueEvent>();

  private _value!: Date;
  public set value(date: Date) {
    this._value = setDefaultSecondsAndMiliseconds(date);
  }
  public get value(): Date {
    return this._value;
  }

  public set currentValue(date: Date | null) {
    this.model.currentValue = date;
  }
  public get currentValue(): Date | null {
    return this.model.currentValue;
  }

  public value$!: Observable<IDateTimeValueModel>;

  init(model: IDateTimeValueInitModel) {
    this.model = model;
    this.value$ = this.subject.asObservable()
      .pipe(
        startWith({ type: DateTimeValueActionType.Init, value: this.model.value }),
        map((event: IDateTimeValueEvent) => {
          this.value = this.calculate(event);

          return {
            value: this.value,
            day: this.day,
            dayNumber: +formatDate(this.value, DateTimeFormatsConstants.DAY_NUMBER_FORMAT, this.model.locale),
            month: formatDate(this.value, DateTimeFormatsConstants.MONTH_FORMAT, this.model.locale),
            year: formatDate(this.value, DateTimeFormatsConstants.YEAR_FORMAT, this.model.locale),
            yearNumber: +formatDate(this.value, DateTimeFormatsConstants.FULL_YEAR_FORMAT, this.model.locale),
            time: this.time,
            hour: +formatDate(this.value, DateTimeFormatsConstants.HOURS_FORMAT, this.model.locale),
            shortHour: formatDate(this.value, DateTimeFormatsConstants.SHORT_HOURS_FORMAT, this.model.locale),
            prefixHour: formatDate(this.value, DateTimeFormatsConstants.PREFIX_HOURS_FORMAT, this.model.locale),
            minute: +formatDate(this.value, DateTimeFormatsConstants.MINUTES_FORMAT, this.model.locale),
            period: formatDate(this.value, DateTimeFormatsConstants.PERIOD_FORMAT, this.model.locale)
          };
        })
      );
  }

  update(event: IDateTimeValueEvent) {
    this.subject.next(event);
  }

  private calculate(event: IDateTimeValueEvent): Date {
    switch (event.type) {
      case DateTimeValueActionType.Init:
        return this.initValue(event.value as Date);
      case DateTimeValueActionType.Date:
        return this.getDate(event.value as Date);
      case DateTimeValueActionType.Hour:
        return setHours(this.value, event.parameter as number);
      case DateTimeValueActionType.Minute:
        return setMinutes(this.value, event.parameter as number);
      case DateTimeValueActionType.Year:
        return setYear(this.value, event.parameter as number);
      case DateTimeValueActionType.MonthAfter:
        return getNextMonth(this.value);
      case DateTimeValueActionType.MonthBefore:
        return getPreviousMonth(this.value);
      case DateTimeValueActionType.YearAfter:
        return getNextYear(this.value);
      case DateTimeValueActionType.YearBefore:
        return getPreviousYear(this.value);
    }
  }

  private initValue(value: Date): Date {
    if (any(this.model.disabledDays)) {
      let value: Date = new Date(),
        isAllowedDate = false;

      while (!isAllowedDate) {
        if (hasItemBy(this.model.disabledDays, (disabledDate: Date) => isEqualDates(disabledDate, value)))
          value = getNextDate(value);
        else
          isAllowedDate = true;
      }

      return value;
    }

    return value;
  }

  private getDate(value: Date): Date {
    if (this.model.time) {
      const result = new Date(this.value);
      result.setFullYear(value.getFullYear());
      result.setMonth(value.getMonth());
      result.setDate(value.getDate());

      return result;
    }

    return value;
  }

  private get day() {
    return this.model.date ? formatDate(this.value, DateTimeFormatsConstants.DAY_FORMAT, this.model.locale)
      : this.model.time
        ? CommonConstants.EMPTY_STRING
        : formatDate(this.value, this.model.format, this.model.locale);
  }

  private get time(): string {
    const minutesValue = formatDate(this.value, DateTimeFormatsConstants.MINUTES_FORMAT, this.model.locale),
      hours = this.model.shortTime
        ? formatDate(this.value, DateTimeFormatsConstants.SHORT_HOURS_FORMAT, this.model.locale)
        : formatDate(this.value, DateTimeFormatsConstants.PREFIX_HOURS_FORMAT, this.model.locale),
      minutes = minutesValue.length === 2 ? minutesValue : `${DateTimeInputConstants.MINUTES_PREFIX}${minutesValue}`,
      period = this.model.shortTime ? ` ${formatDate(this.value, DateTimeFormatsConstants.PERIOD_FORMAT, this.model.locale)}` : CommonConstants.EMPTY_STRING;

    return `${hours}:${minutes}${period}`;
  };
}