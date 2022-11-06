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
  TagsInputComponent,
  NumberInputComponent,
  StarsInputComponent,
  DateTimeInputComponent,
  ImageInputComponent,
  RangeInputComponent,
  RangeInputVerticalComponent,
  RadioInputComponent
} from './components';
import {
  TagsChipComponent,
  BaseInputComponent,
  NumberSpinnerComponent,
  StarComponent,
  DateTimeCalendarComponent,
  DateTimeClockComponent,
  DateTimeYearComponent,
  DateTimeModalComponent,
  ImageEditorComponent
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
    TagsChipComponent,
    NumberInputComponent,
    NumberSpinnerComponent,
    StarsInputComponent,
    StarComponent,
    DateTimeInputComponent,
    DateTimeCalendarComponent,
    DateTimeClockComponent,
    DateTimeYearComponent,
    DateTimeModalComponent,
    ImageInputComponent,
    ImageEditorComponent,
    RadioInputComponent,
    // range
    RangeInputComponent,
    RangeInputVerticalComponent
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
    TagsInputComponent,
    NumberInputComponent,
    StarsInputComponent,
    DateTimeInputComponent,
    ImageInputComponent,
    RadioInputComponent,
    // range
    RangeInputComponent,
    RangeInputVerticalComponent
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BaseInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => BaseInputComponent), multi: true }
  ]
})
export class NgxSfcInputsModule { }