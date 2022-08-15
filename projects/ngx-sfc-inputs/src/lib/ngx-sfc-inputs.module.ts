import { CommonModule } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import {
  TextInputComponent,
  TextAreaInputComponent,
  FileInputComponent,
  InlineFileInputComponent,
  CheckboxInputComponent,
  ToggleInputComponent,
  TagsInputComponent
} from './components';
import {
  TagsChipComponent,
  BaseInputComponent
} from '../lib/components/no-export-index';
import { InputReferenceDirective } from './directives';


@NgModule({
  declarations: [
    // components
    TextInputComponent,
    InputReferenceDirective,
    TextAreaInputComponent,
    FileInputComponent,
    InlineFileInputComponent,
    CheckboxInputComponent,
    ToggleInputComponent,
    TagsInputComponent,
    TagsChipComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxSfcCommonModule
  ],
  exports: [
    // components
    TextInputComponent,
    TextAreaInputComponent,
    FileInputComponent,
    InlineFileInputComponent,
    CheckboxInputComponent,
    ToggleInputComponent,
    TagsInputComponent
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BaseInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => BaseInputComponent), multi: true }
  ]
})
export class NgxSfcInputsModule { }