import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Position } from 'ngx-sfc-common';
import { ComponentSize } from 'ngx-sfc-common';
import { ButtonType, Sequence } from 'ngx-sfc-common';
import { DateTimeValueActionType } from '../../service/value/datetime-value.enum';
import { DateTimeValueService } from '../../service/value/datetime-value.service';
import { DateTimeViewService } from '../../service/view/datetime-view.service';
import { DateTimeViewActionType } from '../../service/view/enums/datetime-view.enum';
import { DateTimeYearConstants } from './datetime-year.constants';

@Component({
  selector: 'sfc-datetime-year',
  templateUrl: './datetime-year.component.html',
  styleUrls: ['./datetime-year.component.scss']
})
export class DateTimeYearComponent implements AfterViewInit {

  Position = Position;
  ButtonType = ButtonType;
  Sequence = Sequence;
  ComponentSize = ComponentSize;

  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  _year!: number;
  @Input()
  get year(): number {
    return this._year;
  }
  set year(value: number) {
    this._year = value;
    this.initList(value);
  }

  @Input()
  minDate: Date | null = null;

  @Input()
  maxDate: Date | null = null;

  @ViewChild('yearsEl')
  yearsEl!: ElementRef;

  scrollTarget!: HTMLElement;

  years: number[] = [];

  constructor(
    public valueService: DateTimeValueService,
    public viewService: DateTimeViewService,
    private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.scrollTarget = this.yearsEl.nativeElement;
    this.changeDetector.detectChanges();
  }

  isDisabled(year: number): boolean {
    return (this.minDate && year < this.minDate.getFullYear())
      || (this.maxDate && year > this.maxDate.getFullYear())
      || false;
  }

  updateList(type: Sequence, single: boolean = false): void {
    const range = single ? 1 : DateTimeYearConstants.YEARS_RANGE;

    for (let index = 0; index < range; index++) {
      if (type === Sequence.Next)
        this.years.push(this.years[this.years.length - 1] + 1);
      else
        this.years.unshift(this.years[0] - 1);
    }

    if (single) {
      if (type === Sequence.Next)
        this.yearsEl.nativeElement.scrollTop = this.yearsEl.nativeElement.scrollHeight;
      else
        this.yearsEl.nativeElement.scrollTop = 1;
    }
  }

  onSelectYear(event: MouseEvent, year: number): void {
    this.valueService.update({ type: DateTimeValueActionType.Year, parameter: year });
    this.viewService.update({ type: DateTimeViewActionType.Year, event: event });
  }

  onScroll(position: Position) {
    const sequence = position === Position.Bottom
      ? Sequence.Next
      : Sequence.Previous;

    this.updateList(sequence);

    if (position === Position.Top)
      this.yearsEl.nativeElement.scrollTop += 1;
  }

  private initList(year: number) {
    if (year) {
      this.years = [];

      for (var i = year - DateTimeYearConstants.YEARS_RANGE; i < year + DateTimeYearConstants.YEARS_RANGE + 1; i++) {
        this.years.push(i);
      }
    }
  }
}