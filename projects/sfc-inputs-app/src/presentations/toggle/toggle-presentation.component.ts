import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { faAutomobile, faBan, faStar } from '@fortawesome/free-solid-svg-icons';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './toggle-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class TogglePresentationComponent extends BasePresentationComponent
  implements OnInit {

  faStar = faStar;
  faAutomobile = faAutomobile;
  faBan = faBan;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        inputToggleNull: [null],
        inputToggleLabel: [null],
        inputTogglePlaceholder: [null],
        inputToggleLabelAndPlaceholder: [null],
        inputToggleIcon: [null],
        inputToggleIconAndLabel: [null],
        inputToggleCustomPositiveIcon: [null],
        inputToggleCustomNegativeIcon: [null],
        inputToggleCustomIcons: [null],
        inputToggleCustomLabels: [null],
        inputToggleCustomLabelsIcon: [null],
        inputToggleCustomLabelsDisabled: [{
          value: true,
          disabled: true
        }, []],
        inputToggleHelper: [null],
        inputToggleHelperAndLabel: [null],
        inputToggleHelperAndLabelAndIcon: [null],
        inputToggleDisabled: [{
          value: false,
          disabled: true
        }, []],
        inputToggleDisabledAndLabel: [{
          value: true,
          disabled: true
        }, []],
        inputToggleDisabledAndLabelAndIcon: [{
          value: true,
          disabled: true
        }, []],
        inputToggleValue: [true],
        inputToggleValueAndPlaceholder: [true],
        inputToggleValueAndIconLabel: [true],
        inputToggleRequiredTrue: [null, {
          validators: [Validators.requiredTrue]
        }],
        inputToggleRequiredTrueValid: [true, {
          validators: [Validators.requiredTrue]
        }],
        inputToggleRequiredTrueInvalid: [false, {
          validators: [Validators.requiredTrue]
        }],
        inputToggleValueInvalidMessageRequiredTrue: [false, {
          validators: [Validators.requiredTrue]
        }],
        inputToggleValueValidMessageRequiredTrue: [true, {
          validators: [Validators.requiredTrue]
        }],
        inputToggleValueValidMessageRequiredTrueEmptyHelperText: [null, {
          validators: [Validators.requiredTrue]
        }],
        inputToggleSmall: [true],
        inputToggleLarge: [true],
        inputToggleCustom: [false]
      }
    );
  }
}
