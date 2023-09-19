import { Component, OnInit } from '@angular/core';
import { equalOrInclude } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../../base-presentations.component';

@Component({
  templateUrl: './bordered-datetime-input-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class BorderedDateTimeInputPresentationComponent
  extends BasePresentationComponent
  implements OnInit {

  minDate!: Date;
  maxDate!: Date;
  disabledDates: Date[] = [];

  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.disabledDates = [new Date(2020, 11, 1), new Date(2020, 11, 4), new Date()];

    this.formGroup = this.formBuilder.group(
      {
        inputDateTimeNull: [null],
        inputDateTimeLabel: [null],
        inputDateTimeIcon: [null],
        inputDateTimeHelper: [null],
        inputDateTimeDisabled: [{
          value: null,
          disabled: true
        }],
        inputDateTimeValue: [new Date(2020, 11, 1, 3, 15, 0, 0)],
        inputDateTimeValidation: [null, {
          validators: [equalOrInclude(new Date(2020, 11, 1, 3, 15, 0, 0))]
        }],
        inputDateTimeValid: [new Date(2020, 11, 1, 3, 15, 0, 0), {
          validators: [equalOrInclude(new Date(2020, 11, 1, 3, 15, 0, 0))]
        }],
        inputDateTimeInValid: [new Date(2021, 0, 4, 3, 15, 0, 0), {
          validators: [equalOrInclude(new Date(2020, 11, 1, 3, 15, 0, 0))]
        }],
        inputDateTimeWeekStart: [null],
        inputDateTimeAllButtons: [null],
        inputDateTimeSwithcOnClick: [null],
        inputDateTimeMin: [null],
        inputDateTimeMax: [null],
        inputDateTimeDisabledDay: [null],
        inputDateTimeFormat: [null],
        inputDateTimeShortFormat: [null],
        inputDateTimeSmall: [new Date()],
        inputDateTimeLarge: [new Date()],
        inputDateTimeCustom: [new Date()]
      });
  }
}
