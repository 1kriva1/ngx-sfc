import { NgModule } from '@angular/core';
import {
  FileExtensionsValidatorDirective,
  FileMaxSizeValidatorDirective,
  FileMinSizeValidatorDirective,
  EqualOrIncludeValidatorDirective,
  MaxLengthValidatorDirective,
  MinLengthValidatorDirective
} from '.';

@NgModule({
  declarations: [
    FileExtensionsValidatorDirective,
    FileMaxSizeValidatorDirective,
    FileMinSizeValidatorDirective,
    EqualOrIncludeValidatorDirective,
    MaxLengthValidatorDirective,
    MinLengthValidatorDirective
  ],
  exports: [
    FileExtensionsValidatorDirective,
    FileMaxSizeValidatorDirective,
    FileMinSizeValidatorDirective,
    EqualOrIncludeValidatorDirective,
    MaxLengthValidatorDirective,
    MinLengthValidatorDirective
  ]
})
export class NgxSfcInputsValidationModule { }
