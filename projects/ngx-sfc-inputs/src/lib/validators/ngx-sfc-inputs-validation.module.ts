import { NgModule } from '@angular/core';
import {
  FileExtensionsValidatorDirective,
  FileMaxSizeValidatorDirective,
  FileMinSizeValidatorDirective,
  EqualOrIncludeValidatorDirective,
  MaxArrayLengthValidatorDirective,
  MinArrayLengthValidatorDirective,
  MatchValidatorDirective,
  CompareThanValidatorDirective
} from '.';

@NgModule({
  declarations: [
    FileExtensionsValidatorDirective,
    FileMaxSizeValidatorDirective,
    FileMinSizeValidatorDirective,
    EqualOrIncludeValidatorDirective,
    MaxArrayLengthValidatorDirective,
    MinArrayLengthValidatorDirective,
    MatchValidatorDirective,
    CompareThanValidatorDirective
  ],
  exports: [
    FileExtensionsValidatorDirective,
    FileMaxSizeValidatorDirective,
    FileMinSizeValidatorDirective,
    EqualOrIncludeValidatorDirective,
    MaxArrayLengthValidatorDirective,
    MinArrayLengthValidatorDirective,
    MatchValidatorDirective,
    CompareThanValidatorDirective
  ]
})
export class NgxSfcInputsValidationModule { }
