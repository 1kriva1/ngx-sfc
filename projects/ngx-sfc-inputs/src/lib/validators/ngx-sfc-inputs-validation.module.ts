import { NgModule } from '@angular/core';
import {
  FileExtensionsValidatorDirective,
  FileMaxSizeValidatorDirective,
  FileMinSizeValidatorDirective
} from '.';

@NgModule({
  declarations: [
    FileExtensionsValidatorDirective,
    FileMaxSizeValidatorDirective,
    FileMinSizeValidatorDirective
  ],
  exports: [
    FileExtensionsValidatorDirective,
    FileMaxSizeValidatorDirective,
    FileMinSizeValidatorDirective
  ]
})
export class NgxSfcInputsValidationModule { }
