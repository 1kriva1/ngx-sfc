import { Component, OnInit } from '@angular/core';
import { equalOrInclude } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../../base-presentations.component';

@Component({
  templateUrl: './time-input-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class TimeInputPresentationComponent extends BasePresentationComponent implements OnInit {

  tempTime!: Date;
  minDate!: Date;
  maxDate!: Date;
  timeValidation!: Date;

  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.tempTime = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate(), this.minDate.getHours() + 3, this.minDate.getMinutes());
    this.timeValidation = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 15, 15, 0, 0);

    this.formGroup = this.formBuilder.group(
      {
        inputTimeNull: [null],
        inputTimeLabel: [null],
        inputTimeIcon: [null],
        inputTimeHelper: [null],
        inputTimeDisabled: [{
          value: null,
          disabled: true
        }],
        inputTimeValue: [new Date(2020, 11, 1, 15, 15, 0, 0)],
        inputTimeValidation: [null, {
          validators: [equalOrInclude(this.timeValidation)]
        }],
        inputTimeValid: [this.timeValidation, {
          validators: [equalOrInclude(this.timeValidation)]
        }],
        inputTimeInValid: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 3, 15, 0, 0), {
          validators: [equalOrInclude(this.timeValidation)]
        }],
        inputTimeShort: [null],
        inputTimeAllButtons: [null],
        inputTimeSwithcOnClick: [null],
        inputTimeMin: [null],
        inputTimeMax: [null],
        inputTimeMinMax: [null],
        inputTimeShortMin: [null],
        inputTimeShortMax: [null],
        inputTimeShortMinMax: [null],
        inputTimeFormat: [null],
        inputTimeShortFormat: [null],
        inputTimeSmall: [new Date()],
        inputTimeLarge: [new Date()],
        inputTimeCustom: [new Date()]
      });
  }



}
