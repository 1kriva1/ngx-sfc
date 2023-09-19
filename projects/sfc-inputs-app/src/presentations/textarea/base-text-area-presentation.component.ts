import { Directive, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BasePresentationComponent } from '../base-presentations.component';

@Directive()
export abstract class BaseTextAreaPresentationComponent extends BasePresentationComponent
  implements OnInit {

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        labelTextArea: [''],
        placeholderTextArea: [''],
        placeholderlabelTextArea: [''],
        labelTextAreaDis: [{
          value: '',
          disabled: true
        }, []],
        placeholderTextAreaDis: [{
          value: '',
          disabled: true
        }, []],
        placlabelTextAreaDis: [{
          value: '',
          disabled: true
        }, []],
        labelTextAreaIcon: [''],
        placeholderTextAreaIcon: [''],
        placlabelTextAreaIcon: [''],
        labelTextAreahelper: [''],
        placeholderTextAreahelper: [''],
        placlabelTextAreahelper: [''],
        undefTextAreaValidation: ['test', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
        }],
        defTextAreaValidation: ['test', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
        }],
        undefTextAreaValidationEmpty: ['test', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
        }],
        undefTextAreaValidationVal: ['tests \n asdasd\n', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
        }],
        defTextAreaValidationVal: ['tests \n asdasd\n', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
        }],
        undefTextAreaValidationEmptyVal: ['tests \n asdasd\n', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
        }],
        undefTextAreaValidationValUndf: ['', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
        }],
        defTextAreaValidationValUndf: ['', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
        }],
        undefTextAreaValidationEmptyValUndf: ['', {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
        }],
        small: [null],
        large: ['Large text input'],
        customSize: [null]
      }
    );
  }
}
