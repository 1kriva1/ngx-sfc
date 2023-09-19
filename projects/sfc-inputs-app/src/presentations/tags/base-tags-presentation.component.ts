import { Directive, OnInit } from '@angular/core';
import { equalOrInclude, maxArrayLength, minArrayLength } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../base-presentations.component';

@Directive()
export abstract class BaseTagsPresentationComponent extends BasePresentationComponent
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
          validators: [maxArrayLength(3)]
        }],
        inputTagsMinLength: [null, {
          validators: [minArrayLength(1)]
        }],
        inputTagsMaxMinLength: [null, {
          validators: [maxArrayLength(3), minArrayLength(1)]
        }],
        inputTagsMaxLengthInvalid: [['qwe', 'asd', 'asdas', '4'], {
          validators: [maxArrayLength(3)]
        }],
        inputTagsMinLengthInvalid: [[], {
          validators: [minArrayLength(1)]
        }],
        inputTagsMaxMinLengthInvalid: [[], {
          validators: [maxArrayLength(3), minArrayLength(1)]
        }],
        inputTagsMaxLengthValid: [['qwe', 'asd', 'asdas'], {
          validators: [maxArrayLength(3)]
        }],
        inputTagsMinLengthValid: [['test 1'], {
          validators: [minArrayLength(1)]
        }],
        inputTagsMaxMinLengthValid: [['test 1', 'test 2'], {
          validators: [maxArrayLength(3), minArrayLength(1)]
        }],
        inputTagsMaxMinValueLengthValid: [null],
        inputTagsSmall: [['test 1', 'test 2']],
        inputTagsLarge: [['test 1', 'test 2']],
        inputTagsCustom: [['test 1', 'test 2']]
      }
    );
  }
}
