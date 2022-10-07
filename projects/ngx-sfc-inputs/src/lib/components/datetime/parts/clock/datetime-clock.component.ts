import { Component, Input, OnInit, Optional } from '@angular/core';
import { ButtonType, ComponentSize, ComponentSizeDirective } from 'ngx-sfc-common';
import { getRotateValue } from 'ngx-sfc-common';
import { DateTimeConstants } from 'ngx-sfc-common';
import { DateTimeInputConstants } from '../../constants/datetime.constants';
import { DateTimeView } from '../../datetime-input-view.enum';
import { IDateTimeState } from '../../models/datetime-input-state.model';
import { DateTimeValueActionType } from '../../service/value/datetime-value.enum';
import { DateTimeValueService } from '../../service/value/datetime-value.service';
import { DateTimeViewService } from '../../service/view/datetime-view.service';
import { DateTimeViewActionType } from '../../service/view/enums/datetime-view.enum';
import { IClockModel } from './datetime-clock.model';

@Component({
  selector: 'sfc-datetime-clock',
  templateUrl: './datetime-clock.component.html',
  styleUrls: ['./datetime-clock.component.scss']
})
export class DateTimeClockComponent implements OnInit {

  ButtonType = ButtonType;
  ComponentSize = ComponentSize;
  DateTimeView = DateTimeView;

  @Input()
  hour!: number;

  @Input()
  minute!: number;

  @Input()
  time!: string;

  @Input()
  shortTime: boolean = false;

  @Input()
  minDate: Date | null = null;

  @Input()
  maxDate: Date | null = null;

  @Input()
  locale: string = DateTimeInputConstants.DEFAULT_LOCALE;

  @Input()
  switchOnClick: boolean = false;

  clock: IClockModel = {
    hours: [],
    minutes: []
  };

  get isPM(): boolean {
    return this.shortTime && this.valueService.value.getHours() >= DateTimeConstants.HOURS_IN_SHORT_TIME;
  }

  get minutesHandStyle() {
    return { transform: getRotateValue(360 * this.minute / DateTimeConstants.MINUTES_IN_HOUR) }
  }

  get hoursHandStyle() {
    return { transform: getRotateValue(360 * this.hour / DateTimeConstants.HOURS_IN_SHORT_TIME) }
  }

  constructor(public valueService: DateTimeValueService, public viewService: DateTimeViewService,
    @Optional() public componentSize: ComponentSizeDirective) { }

  ngOnInit(): void {
    this.initClockSize();

    this.initHours();

    // if not short time - init hours for PM
    if (!this.shortTime)
      this.initHours(false);

    this.initMinutes();
  }

  hourClasses(hour: number): IDateTimeState {
    return {
      disabled: this.isDisabledHour(hour),
      selected: this.isHourSelected(hour)
    };
  }

  minuteClasses(minute: number): IDateTimeState {
    return {
      disabled: this.isDisabledMinute(minute),
      selected: this.isMinuteSelected(minute)
    };
  }

  isMinuteSelected(minute: number) {
    return this.valueService.value.getMinutes() == minute;
  }

  isHourSelected(hour: number) {
    return this.valueService.value.getHours() == this.getHourValue(hour);
  }

  isDisabledMinute(minute: number) {
    const itemDateMinute = new Date(this.valueService.value);
    itemDateMinute.setMinutes(minute);

    return (this.minDate && itemDateMinute < this.minDate) || (this.maxDate && itemDateMinute > this.maxDate) || false;
  }

  isDisabledHour(hour: number): boolean {
    let isDisabledByMin = false, isDisabledByMax;

    const itemDateHour = new Date(this.valueService.value);
    itemDateHour.setHours(this.getHourValue(hour));
    itemDateHour.setMinutes(0);

    if (this.minDate) {
      const minDateHour = new Date(this.minDate);
      minDateHour.setMinutes(0);
      isDisabledByMin = itemDateHour < minDateHour;
    }

    if (this.maxDate) {
      const maxDateHour = new Date(this.maxDate);
      maxDateHour.setMinutes(0);
      isDisabledByMax = itemDateHour > maxDateHour;
    }

    return isDisabledByMin || isDisabledByMax || false;
  }

  onSelectHour(hour: number) {
    if (!this.isHourSelected(hour)) {
      this.valueService.update({ type: DateTimeValueActionType.Hour, parameter: this.getHourValue(hour) });

      if (this.switchOnClick)
        this.viewService.update({ type: DateTimeViewActionType.Hour });
    }
  }

  onSelectMinute(minute: number, event: MouseEvent) {
    if (!this.isMinuteSelected(minute)) {
      this.valueService.update({ type: DateTimeValueActionType.Minute, parameter: minute });

      if (this.switchOnClick)
        this.viewService.update({ type: DateTimeViewActionType.Minute, event: event });
    }
  }

  onAM() {
    if (this.isPM) {
      const hour = this.valueService.value.getHours() - DateTimeConstants.HOURS_IN_SHORT_TIME;
      this.valueService.update({ type: DateTimeValueActionType.Hour, parameter: hour });
    }
  }

  onPM() {
    if (!this.isPM) {
      const hour = this.valueService.value.getHours() + DateTimeConstants.HOURS_IN_SHORT_TIME;
      this.valueService.update({ type: DateTimeValueActionType.Hour, parameter: hour });
    }
  }

  private getHourValue(hour: number): number {
    if (this.shortTime) {
      if (this.isPM) {
        if (hour + DateTimeConstants.HOURS_IN_SHORT_TIME == DateTimeConstants.HOURS_IN_TIME) {
          return DateTimeConstants.HOURS_IN_SHORT_TIME;
        }

        return hour + DateTimeConstants.HOURS_IN_SHORT_TIME;
      }

      return hour == DateTimeConstants.HOURS_IN_SHORT_TIME ? DateTimeConstants.MIDNIGHT_HOUR : hour;
    }

    return hour == DateTimeConstants.HOURS_IN_TIME ? DateTimeConstants.MIDNIGHT_HOUR : hour;
  }

  // INIT

  private initClockSize() {
    const viewBox = this.getProportionalValue(400),
      translate = viewBox / 2;
    this.clock.viewBox = `0,0,${viewBox},${viewBox}`;
    this.clock.translate = `translate(${translate},${translate})`;
  }

  private initHours(isShortTime: boolean = true) {
    for (let i = 0; i < DateTimeConstants.HOURS_IN_SHORT_TIME; i++) {
      const x = -((isShortTime ? this.getProportionalValue(162) : this.getProportionalValue(110)) * (Math.sin(-Math.PI * 2 * (i / DateTimeConstants.HOURS_IN_SHORT_TIME)))),
        y = -((isShortTime ? this.getProportionalValue(162) : this.getProportionalValue(110)) * (Math.cos(-Math.PI * 2 * (i / DateTimeConstants.HOURS_IN_SHORT_TIME)))),
        value = isShortTime
          ? i === 0 ? DateTimeConstants.HOURS_IN_SHORT_TIME : i
          : i === 0 ? DateTimeConstants.HOURS_IN_TIME : i + DateTimeConstants.HOURS_IN_SHORT_TIME;

      this.addHoursConfigItem(x, y, value);
    }
  }

  private addHoursConfigItem(x: number, y: number, value: number) {
    this.clock.hours.push({
      value: value,
      circle: { cx: x, cy: y },
      text: { x: x, y: y + this.getProportionalValue(7) }
    });
  }

  private initMinutes() {
    for (let minute = 0; minute < DateTimeConstants.MINUTES_IN_HOUR; minute++) {
      this.clock.minutes.push({
        value: minute,
        circle: this.buildMinuteCircle(minute),
        text: minute % 5 === 0 ? this.buildMinuteText(minute) : null
      })
    }
  }

  private buildMinuteCircle(minute: number) {
    const s = ((minute % 5 === 0) ? this.getProportionalValue(162) : this.getProportionalValue(160)),
      r = ((minute % 5 === 0) ? 0.75 : 0.1875),
      x = -(s * (Math.sin(-Math.PI * 2 * (minute / DateTimeConstants.MINUTES_IN_HOUR)))),
      y = -(s * (Math.cos(-Math.PI * 2 * (minute / DateTimeConstants.MINUTES_IN_HOUR))));

    return { cx: x, cy: y, r: r };
  }

  private buildMinuteText(minute: number) {
    const x = -(this.getProportionalValue(162) * (Math.sin(-Math.PI * 2 * (minute / DateTimeConstants.MINUTES_IN_HOUR)))),
      y = -(this.getProportionalValue(162) * (Math.cos(-Math.PI * 2 * (minute / DateTimeConstants.MINUTES_IN_HOUR))));

    return { x: x, y: y + this.getProportionalValue(7) };
  }

  private getProportionalValue(value: number) {
    return (this.componentSize?.proportion || 1) * value;
  }

  // END INIT
}