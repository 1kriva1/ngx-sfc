import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { equalOrInclude } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './number-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class NumberPresentationComponent extends BasePresentationComponent
  implements OnInit {

  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        inputNumberNull: [null],
        inputNumberLabel: [null],
        inputNumberIcon: [null],
        inputNumberHelper: [null],
        inputNumberLabelHelper: [null],
        inputNumberLabelIconHelper: [null],
        inputNumberCustomNext: [null],
        inputNumberCustomPrev: [null],
        inputNumberCustomNextPrev: [null],
        inputNumberMax: [null],
        inputNumberMin: [null],
        inputNumberMaxMin: [null],
        inputNumberMaxStep: [null],
        inputNumberMinStep: [null],
        inputNumberMaxMinStep: [null],
        inputNumberFixed: [null],
        inputNumberFixedActions: [null],
        inputNumberFixedAll: [null],
        inputNumberDisabled: [{
          value: null,
          disabled: true
        }],
        inputNumberFixedDisabled: [{
          value: 3,
          disabled: true
        }],
        inputNumberFixedAllDisabled: [{
          value: null,
          disabled: true
        }],
        inputNumberValidation: [null, {
          validators: [equalOrInclude(1)]
        }],
        inputNumberValidationLabel: [4, {
          validators: [Validators.max(3)]
        }],
        inputNumberValidationIcon: [null, {
          validators: [Validators.min(3)]
        }],
        inputNumberValidationMessage: [null, {
          validators: [equalOrInclude(1)]
        }],
        inputNumberValidationLabelMessage: [4, {
          validators: [Validators.max(3)]
        }],
        inputNumberValidationIconMessage: [null, {
          validators: [Validators.min(3)]
        }],
        inputNumberSmall: [4],
        inputNumberLarge: [4],
        inputNumberCustom: [4],
        inputNumberEdit: [null]
      }
    );
  }
}
