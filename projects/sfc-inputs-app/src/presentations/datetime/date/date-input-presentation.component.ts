import { Component, OnInit } from '@angular/core';
import { equalOrInclude } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../../base-presentations.component';

@Component({
  templateUrl: './date-input-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class DateInputPresentationComponent extends BasePresentationComponent implements OnInit {
  tempDate!: Date;
  tempTime!: Date;
  minDate!: Date;
  maxDate!: Date;
  disabledDates: Date[] = [];

  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.tempDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate() + 7, this.minDate.getHours() + 3, this.minDate.getMinutes());
    this.disabledDates = [new Date(2020, 11, 1), new Date(2020, 11, 4), new Date()];

    this.formGroup = this.formBuilder.group(
      {
        inputDateNull: [null],
        inputDateLabel: [null],
        inputDateIcon: [null],
        inputDateHelper: [null],
        inputDateDisabled: [{
          value: null,
          disabled: true
        }],
        inputDateValue: [new Date(2020, 11, 1)],
        inputDateValidation: [null, {
          validators: [equalOrInclude(new Date(2020, 11, 1))]
        }],
        inputDateValid: [new Date(2020, 11, 1), {
          validators: [equalOrInclude(new Date(2020, 11, 1))]
        }],
        inputDateInValid: [new Date(2021, 0, 4), {
          validators: [equalOrInclude(new Date(2020, 11, 1))]
        }],
        inputDateWeekStart: [null],
        inputDateAllButtons: [null],
        inputDateSwithcOnClick: [null],
        inputDateMin: [null],
        inputDateMax: [null],
        inputDateDisabledDay: [null],
        inputDateFormat1: [null],
        inputDateSmall: [new Date()],
        inputDateLarge: [new Date()],
        inputDateCustom: [new Date()]
      });
  }
}
