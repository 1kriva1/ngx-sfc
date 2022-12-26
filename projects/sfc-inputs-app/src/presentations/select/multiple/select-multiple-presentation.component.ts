import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { equalOrInclude } from 'ngx-sfc-inputs';
import { BaseSelectPresentationComponent } from '../base-select-presentation.component';

@Component({
  templateUrl: './select-multiple-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class MultipleSelectPresentationComponent extends BaseSelectPresentationComponent
  implements OnInit {

  override ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        inputSelectMultipleEmpty: [null],
        inputSelectMultiple: [null],
        inputSelectultipleWithoutDefault: [null],
        inputSelectMultipleWithValue: [[this.data[4], this.data[3]]],
        inputSelectultipleDisabled: [{
          value: [this.data[4]],
          disabled: true
        }],
        inputSelectMultipleNotFound: [[this.data[4], this.data[33]]],
        inputSelectMultipleValidation: [null, {
          validators: [Validators.required, equalOrInclude([{
            key: 9,
            value: "leo 9"
          }, {
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectMultipleValidationWithValue: [[{
          key: 9,
          value: "leo 9"
        }], {
          validators: [Validators.required, equalOrInclude([{
            key: 9,
            value: "leo 9"
          }, {
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectMultipleValidationWithValueInv: [[{
          key: 11,
          value: "vova 11"
        }], {
          validators: [Validators.required, equalOrInclude([{
            key: 9,
            value: "leo 9"
          }, {
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectMultipleSmall: [null],
        inputSelectMultipleLarge: [null],
        inputSelectMultipleCustom: [null],
        inputSelectMultipleScroll: [null],
        inputSelectMultipleModification: [null],
        // observable
        inputSelectMultipleObservableHelperIcon: [null],
        inputSelectMultipleObservableValidationMessage: [null, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectMultipleObservableModification: [null],
        // loader
        inputSelectMultipleLoaderHelperIcon: [null],
        inputSelectMultipleLoaderValidationMessage: [null, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectMultipleLoaderModification: [null]
      }
    );

    super.ngOnInit();
  }
}
