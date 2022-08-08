import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CheckmarkType } from 'ngx-sfc-common';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './checkbox-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class CheckboxPresentationComponent extends BasePresentationComponent
  implements OnInit {

  CheckmarkType = CheckmarkType;

  faStar = faStar;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        inputCheckboxNull: [null],
        inputCheckboxLabel: [null],
        inputCheckboxPlaceholder: [null],
        inputCheckboxPlaceholderAndLabel: [null],
        inputCheckboxIcon: [null],
        inputCheckboxIconAndLabel: [null],
        inputCheckboxHelperText: [null],
        inputCheckboxHelperTextLabel: [null],
        inputCheckboxHelperTextLabelIcon: [null],
        inputCheckboxDisabled: [{
          value: false,
          disabled: true
        }, []],
        inputCheckboxDisabledLabel: [{
          value: true,
          disabled: true
        }, []],
        inputCheckboxDisabledLabelIcon: [{
          value: false,
          disabled: true
        }, []],
        inputCheckboxValue: [true],
        inputCheckboxValueLabel: [true],
        inputCheckboxValueLabelIcon: [true],
        inputCheckboxRequiredTrue: [null, {
          validators: [Validators.requiredTrue]
        }],
        inputCheckboxValueRequiredTrue: [true, {
          validators: [Validators.requiredTrue]
        }],
        inputCheckboxInvalidValueRequiredTrue: [false, {
          validators: [Validators.requiredTrue]
        }],
        inputCheckboxValueInvalidMessageRequiredTrue: [false, {
          validators: [Validators.requiredTrue]
        }],
        inputCheckboxValueValidMessageRequiredTrue: [true, {
          validators: [Validators.requiredTrue]
        }],
        inputCheckboxValueValidMessageRequiredTrueEmptyHelperText: [null, {
          validators: [Validators.requiredTrue]
        }],
        inputCheckboxSmall: [true],
        inputCheckboxLarge: [false],
        inputCheckboxCustom: [null, {
          validators: [Validators.requiredTrue]
        }],
        inputCheckboxRounded: [true],
        inputCheckboxRoundedHelpText: [false],
        inputCheckboxRoundedValidation: [null, {
          validators: [Validators.requiredTrue]
        }],
        inputCheckboxRoundedSmall: [true],
        inputCheckboxRoundedLarge: [false],
        inputCheckboxRoundedCustom: [null, {
          validators: [Validators.requiredTrue]
        }]
      }
    );
  }
}
