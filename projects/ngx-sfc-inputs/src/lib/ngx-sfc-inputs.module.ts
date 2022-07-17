import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { TextInputComponent } from './components';
import { InputReferenceDirective } from './directives';

@NgModule({
  declarations: [
    TextInputComponent,
    InputReferenceDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxSfcCommonModule
  ],
  exports: [
    TextInputComponent
  ]
})
export class NgxSfcInputsModule { }