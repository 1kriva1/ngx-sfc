import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { equalOrInclude } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './stars-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class StarsPresentationComponent extends BasePresentationComponent
  implements OnInit {

  data: number[] = [3, 4, 5, 2, 8];

  data2: number[] = [1, 2];

  data10: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        inputStarRatingNull: [null],
        inputStarRatingLabel: [null],
        inputStarRatingIcon: [null],
        inputStarRatingHelper: [null],
        inputStarRatingHelperLabel: [null],
        inputStarRatingHelperLabelIcon: [null],
        inputStarRatingCounter: [null],
        inputStarRatingResetButton: [null],
        inputStarRatingCounterResetButton: [null],
        inputStarRatingCounterValue: [2],
        inputStarRatingResetButtonValue: [5],
        inputStarRatingCounterResetButtonValue: [8],
        inputStarRatingDisabled: [{
          value: null,
          disabled: true
        }],
        inputStarRatingDisabledValue: [{
          value: 5,
          disabled: true
        }],
        inputStarRatingDisabledValueActions: [{
          value: 5,
          disabled: true
        }],
        inputStarRatingValidation: [null, {
          validators: [equalOrInclude(5)]
        }],
        inputStarRatingValidationActions: [2, {
          validators: [Validators.min(3)]
        }],
        inputStarRatingValidationValue: [3, {
          validators: [Validators.max(4)]
        }],
        inputStarRatingValidationMessage: [null, {
          validators: [equalOrInclude(5)]
        }],
        inputStarRatingValidationActionsMessage: [2, {
          validators: [Validators.min(3)]
        }],
        inputStarRatingValidationValueMessage: [3, {
          validators: [Validators.max(4)]
        }],
        inputStarRating2Star: [null],
        inputStarRating10Star: [null],
        inputStarRatingSmall: [2],
        inputStarRatingLarge: [4],
        inputStarRatingCustom: [8]
      }
    );
  }
}
