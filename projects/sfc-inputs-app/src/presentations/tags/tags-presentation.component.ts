import { Component, OnInit } from '@angular/core';
import { equalOrInclude, maxLength, minLength } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './tags-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class TagsPresentationComponent extends BasePresentationComponent
  implements OnInit {

  ngOnInit(): void {
    const data = ["tag 1", "asda sd atag 1", "tag 3", "as", "asddddaaaaaasqqqqqqqqqqqq"]

    this.formGroup = this.formBuilder.group(
      {
        inputTagsNull: [null],
        inputTagsLabel: [null],
        inputTagsPlaceholder: [null],
        inputTagsLabelPlaceholder: [null],
        inputTagsLabelNewTagPlaceholder: [null],
        inputTagsIcon: [null],
        inputTagsIconLabel: [null],
        inputTagsIconLabelPlaceholder: [null],
        inputTagsValue: [data.slice()],
        inputTagsValueLabel: [data.slice()],
        inputTagsValuePlaceholder: [data.slice()],
        inputTagsValueLabelPlaceholder: [data.slice()],
        inputTagsValueLabelPlaceholderIcon: [data.slice()],
        inputTagsHelper: [null],
        inputTagsHelperLabel: [null],
        inputTagsHelperLabelIcon: [null],
        inputTagsDisabled: [{
          value: null,
          disabled: true
        }, []],
        inputTagsLabelDisabled: [{
          value: null,
          disabled: true
        }, []],
        inputTagsLabelPlaceholderDisabled: [{
          value: null,
          disabled: true
        }, []],
        inputTagsLabelPlaceholderIconDisabled: [{
          value: null,
          disabled: true
        }, []],
        inputTagsLabelPlaceholderIconHelperDisabled: [{
          value: null,
          disabled: true
        }, []],
        inputTagsLabelPlaceholderIconHelperValueDisabled: [{
          value: data.slice(),
          disabled: true
        }, []],
        inputTagsValidation: [{
          value: null,
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsLabelValidation: [{
          value: null,
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsLabelIconHelperValidation: [{
          value: '',
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsValidationFailed: [{
          value: ['asd'],
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsLabelValidationFailed: [{
          value: ['asd'],
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsLabelIconHelperValidationFailed: [{
          value: ['asd'],
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsValidationCustomMsgFailed: [{
          value: ['asd'],
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsLabelValidationCustomMsgFailed: [{
          value: ['asd'],
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsLabelIconHelperValidationCustomMsgFailed: [{
          value: ['asd'],
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsValidationSuccess: [{
          value: ['rty'],
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsLabelValidationSuccess: [{
          value: ['qwe'],
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsLabelIconHelperValidationSuccess: [{
          value: ['qwe', 'rty'],
          disabled: false
        }, [equalOrInclude(['qwe', 'rty'])]],
        inputTagsMaxLength: [null, {
          validators: [maxLength(3)]
        }],
        inputTagsMinLength: [null, {
          validators: [minLength(1)]
        }],
        inputTagsMaxMinLength: [null, {
          validators: [maxLength(3), minLength(1)]
        }],
        inputTagsMaxLengthInvalid: [['qwe', 'asd', 'asdas', '4'], {
          validators: [maxLength(3)]
        }],
        inputTagsMinLengthInvalid: [[], {
          validators: [minLength(1)]
        }],
        inputTagsMaxMinLengthInvalid: [[], {
          validators: [maxLength(3), minLength(1)]
        }],
        inputTagsMaxLengthValid: [['qwe', 'asd', 'asdas'], {
          validators: [maxLength(3)]
        }],
        inputTagsMinLengthValid: [['test 1'], {
          validators: [minLength(1)]
        }],
        inputTagsMaxMinLengthValid: [['test 1', 'test 2'], {
          validators: [maxLength(3), minLength(1)]
        }],
        inputTagsSmall: [['test 1', 'test 2']],
        inputTagsLarge: [['test 1', 'test 2']],
        inputTagsCustom: [['test 1', 'test 2']]
      }
    );
  }
}
