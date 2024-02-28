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
  SelectInputComponent,
  BubblesInputComponent
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
  SelectItemComponent,
  BubbleComponent
} from '../lib/components/no-export-index';
import {
  InputReferenceDirective,
  InputNumberDirective,
  InputFocusDirective
} from './directives';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';

@NgModule({
  declarations: [
    // text
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
    SelectItemComponent,
    // bubbles
    BubblesInputComponent,
    BubbleComponent,
    // directives
    InputFocusDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule
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
    BubblesInputComponent,
    // range
    RangeInputComponent,
    RangeInputVerticalComponent,
    // directives
    InputFocusDirective
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BaseInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => BaseInputComponent), multi: true }
  ]
})
export class NgxSfcInputsModule { }