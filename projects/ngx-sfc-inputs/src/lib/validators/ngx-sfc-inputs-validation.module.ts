import { NgModule } from '@angular/core';
import {
  FileExtensionsValidatorDirective,
  FileMaxSizeValidatorDirective,
  FileMinSizeValidatorDirective,
  EqualOrIncludeValidatorDirective,
  MaxLengthValidatorDirective,
  MinLengthValidatorDirective,
  MatchValidatorDirective
} from '.';

@NgModule({
  declarations: [
    FileExtensionsValidatorDirective,
    FileMaxSizeValidatorDirective,
    FileMinSizeValidatorDirective,
    EqualOrIncludeValidatorDirective,
    MaxLengthValidatorDirective,
    MinLengthValidatorDirective,
    MatchValidatorDirective
  ],
  exports: [
    FileExtensionsValidatorDirective,
    FileMaxSizeValidatorDirective,
    FileMinSizeValidatorDirective,
    EqualOrIncludeValidatorDirective,
    MaxLengthValidatorDirective,
    MinLengthValidatorDirective,
    MatchValidatorDirective
  ]
})
export class NgxSfcInputsValidationModule { }
