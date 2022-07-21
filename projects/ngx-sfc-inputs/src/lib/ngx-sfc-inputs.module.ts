import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import {
  TextInputComponent,
  TextAreaInputComponent
} from './components';
import { InputReferenceDirective } from './directives';

@NgModule({
  declarations: [
    TextInputComponent,
    InputReferenceDirective,
    TextAreaInputComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxSfcCommonModule
  ],
  exports: [
    TextInputComponent,
    TextAreaInputComponent
  ]
})
export class NgxSfcInputsModule { }