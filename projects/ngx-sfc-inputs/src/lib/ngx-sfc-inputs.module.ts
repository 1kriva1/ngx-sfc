import { CommonModule } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import {
  TextInputComponent,
  TextAreaInputComponent,
  FileInputComponent,
  InlineFileInputComponent
} from './components';
import BaseInputComponent from './components/base/base-input.component';
import { InputReferenceDirective } from './directives';

@NgModule({
  declarations: [
    // components
    TextInputComponent,
    InputReferenceDirective,
    TextAreaInputComponent,
    FileInputComponent,
    InlineFileInputComponent
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
    InlineFileInputComponent
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BaseInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => BaseInputComponent), multi: true }
  ]
})
export class NgxSfcInputsModule { }