import { CommonModule } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  RadioInputComponent,
  AutoCompleteInputComponent,
  SelectInputComponent
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
  ImageEditorComponent,
  AutoCompleteItemComponent,
  SelectItemComponent
} from '../lib/components/no-export-index';
import { InputReferenceDirective, InputNumberDirective } from './directives';
import { NgxSfcCommonModule } from 'ngx-sfc-common';

@NgModule({
  declarations: [
    // components
    TextInputComponent,
    InputReferenceDirective,
    TextAreaInputComponent,
    // file
    FileInputComponent,
    InlineFileInputComponent,
    CheckboxInputComponent,
    ToggleInputComponent,
    RadioInputComponent,
    //tags
    TagsInputComponent,
    TagsChipComponent,
    // number
    NumberInputComponent,
    NumberSpinnerComponent,
    InputNumberDirective,
    // stars
    StarsInputComponent,
    StarComponent,
    // datetime
    DateTimeInputComponent,
    DateTimeCalendarComponent,
    DateTimeClockComponent,
    DateTimeYearComponent,
    DateTimeModalComponent,
    // image
    ImageInputComponent,
    ImageEditorComponent,
    // range
    RangeInputComponent,
    RangeInputVerticalComponent,
    // autocomplete
    AutoCompleteInputComponent,
    AutoCompleteItemComponent,
    // select
    SelectInputComponent,
    SelectItemComponent
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
    AutoCompleteInputComponent,
    SelectInputComponent,
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