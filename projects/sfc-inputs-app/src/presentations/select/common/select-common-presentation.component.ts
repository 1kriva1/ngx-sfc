import { Component, OnInit } from '@angular/core';
import { equalOrInclude } from 'ngx-sfc-inputs';
import { BaseSelectPresentationComponent } from '../base-select-presentation.component';

@Component({
  templateUrl: './select-common-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class CommonSelectPresentationComponent extends BaseSelectPresentationComponent
  implements OnInit {
  override ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        inputSelectFullEmpty: [null],
        inputSelectWithData: [null],
        inputSelectWithLabel: [null],
        inputSelectWithPlace: [null],
        inputSelectWithLabelPlace: [null],
        inputSelectCustomDefault: [null],
        inputSelectWithoutDefault: [null],
        inputSelectDisabled: [{
          value: null,
          disabled: true
        }],
        inputSelectIcon: [null],
        inputSelectHelper: [null],
        inputSelectWithValue: [this.data[4]],
        inputSelectSingle: [this.data[9]],
        inputSelectValidation: [null, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectValidationSuccess: [{
          key: 3,
          value: "anita 3"
        }, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectValidationFailed: [{
          key: 1,
          value: "vova 11"
        }, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectValidationMessage: [null, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectValidationSuccessMessage: [{
          key: 3,
          value: "anita 3"
        }, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectValidationFailedMessage: [{
          key: 3,
          value: "anita 3"
        }, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectSmall: [null],
        inputSelectLarge: [null],
        inputSelectCustom: [null],
        inputSelectScroll: [null],
        inputSelectModification: [null],
        // observable
        inputSelectObservableHelperIcon: [null],
        inputSelectObservableValidationMessage: [null, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectObservableModification: [null],
        // loader
        inputSelectLoaderHelperIcon: [null],
        inputSelectLoaderValidationMessage: [null, {
          validators: [equalOrInclude([{
            key: 3,
            value: "anita 3"
          }])]
        }],
        inputSelectLoaderModification: [null]
      }
    );

    super.ngOnInit();
  }
}
