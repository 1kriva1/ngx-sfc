import { formatDate, WeekDay } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CommonConstants, setDefaultSecondsAndMiliseconds } from 'ngx-sfc-common';
import { isNullOrEmptyString } from 'ngx-sfc-common';
import { BaseInputComponent } from '../base/base-input.component';
import { DateTimeInputConstants } from './constants/datetime.constants';
import { DateTimeFormatsConstants } from './constants/formats.constants';
import { DateTimeValueService } from './service/value/datetime-value.service';
import { DateTimeViewActionType } from './service/view/enums/datetime-view.enum';
import { DateTimeViewService } from './service/view/datetime-view.service';
import { IDateTimeValueInitModel } from './service/value/models/datetime-value-init.model';
import { Subscription } from 'rxjs';
import { DateTimeValueActionType } from './service/value/datetime-value.enum';

@Component({
  selector: 'sfc-datetime-input',
  templateUrl: './datetime-input.component.html',
  styleUrls: ['../../styles/input.component.scss', './datetime-input.component.scss'],
  providers: [DateTimeViewService, DateTimeValueService]
})
export class DateTimeInputComponent extends BaseInputComponent<Date> implements OnInit, OnDestroy {

  @Input()
  date: boolean = true;

  @Input()
  time: boolean = true;

  @Input()
  year: boolean = true;

  private _format!: string;
  @Input()
  get format(): string {
    return isNullOrEmptyString(this._format) ? this.defaultFormat : this._format;
  }
  set format(value: string) {
    this._format = value;
  }

  _minDate: Date | null = null;
  @Input()
  get minDate(): Date | null {
    return this._minDate ? setDefaultSecondsAndMiliseconds(this._minDate) : this._minDate;
  }
  set minDate(value: Date | null) {
    this._minDate = value;
  }

  _maxDate: Date | null = null;
  @Input()
  get maxDate(): Date | null {
    return this._maxDate ? setDefaultSecondsAndMiliseconds(this._maxDate) : this._maxDate;
  }
  set maxDate(value: Date | null) {
    this._maxDate = value;
  }

  @Input()
  disabledDays: Date[] = [];

  @Input()
  locale: string = DateTimeInputConstants.DEFAULT_LOCALE;

  @Input()
  weekStart: WeekDay = WeekDay.Monday;

  @Input()
  shortTime: boolean = false;

  @Input()
  clearButton = false;

  @Input()
  nowButton = false;

  @Input()
  switchOnClick: boolean = false;

  private _valueChangeSubscription!: Subscription;

  get displayDate() {
    return this.value ? formatDate(this.value, this.format, this.locale) : CommonConstants.EMPTY_STRING;
  }

  constructor(@Optional() ngControl: NgControl,
    changeDetector: ChangeDetectorRef,
    renderer: Renderer2,
    elementRef: ElementRef,
    public viewService: DateTimeViewService,
    public valueService: DateTimeValueService) {
    super(ngControl, changeDetector, renderer, elementRef);
  }

  ngOnInit(): void {
    this.viewService.init({ date: this.date, time: this.time });

    const valueModel: IDateTimeValueInitModel = {
      date: this.date,
      time: this.time,
      format: this.format,
      locale: this.locale,
      shortTime: this.shortTime,
      disabledDays: this.disabledDays,
      value: this.hasValue ? this.value as Date : new Date()
    };
    this.valueService.init(valueModel);

    this._valueChangeSubscription = this.value$.subscribe((value: Date) =>
      this.valueService.update({ type: DateTimeValueActionType.Init, value: value }));
  }

  ngOnDestroy(): void {
    this._valueChangeSubscription.unsubscribe();
  }

  update(value: Date | null) {
    this.onChange(value);
    this.viewService.update({ type: DateTimeViewActionType.RefreshState });
  }

  private get defaultFormat(): string {
    if (this.date && this.time)
      return `${DateTimeFormatsConstants.DEFAULT_DATE_TIME_FORMAT}, ${this.shortTime
        ? DateTimeFormatsConstants.SHORT_HOURS_FORMAT : DateTimeFormatsConstants.HOURS_FORMAT}:mm${this.shortTime
          ? `${DateTimeFormatsConstants.PERIOD_FORMAT}`
          : CommonConstants.EMPTY_STRING}`; // 16/12/2020, 14:23

    if (this.date && !this.time)
      return DateTimeFormatsConstants.DEFAULT_DATE_TIME_FORMAT; // 16/12/2020

    if (!this.date && this.time)
      return `${this.shortTime
        ? DateTimeFormatsConstants.SHORT_HOURS_FORMAT
        : DateTimeFormatsConstants.HOURS_FORMAT}:mm${this.shortTime
          ? ` ${DateTimeFormatsConstants.PERIOD_FORMAT}`
          : CommonConstants.EMPTY_STRING}` // 14:23

    return DateTimeFormatsConstants.FULL_DATE_TIME_FORMAT; // Monday, June 15, 2015 at 9:03:01 AM GMT+01:00
  }
}