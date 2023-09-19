import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  TextPresentationComponent,
  TextAreaPresentationComponent,
  FilePresentationComponent,
  FileInputPresentationComponent,
  InlineFileInputPresentationComponent,
  CheckboxPresentationComponent,
  TogglePresentationComponent,
  TagsPresentationComponent,
  NumberPresentationComponent,
  StarsPresentationComponent,
  DateTimePresentationComponent,
  DateInputPresentationComponent,
  TimeInputPresentationComponent,
  DateTimeInputPresentationComponent,
  YearsInputPresentationComponent,
  ImagePresentationComponent,
  RangePresentationComponent,
  HorizontalRangePresentationComponent,
  VerticalRangePresentationComponent,
  RadioPresentationComponent,
  HorizontalRadioPresentationComponent,
  VerticalRadioPresentationComponent,
  AutoCompletePresentationComponent,
  SelectPresentationComponent,
  CommonSelectPresentationComponent,
  MultipleSelectPresentationComponent,
  GroupSelectPresentationComponent,
  CommonTextPresentationComponent,
  BorderedTextPresentationComponent,
  CommonTextAreaPresentationComponent,
  BorderedTextAreaPresentationComponent,
  CommonFileInputPresentationComponent,
  BorderedFileInputPresentationComponent,
  CommonTagsPresentationComponent,
  BorderedTagsPresentationComponent,
  CommonNumberPresentationComponent,
  EditNumberPresentationComponent,
  BorderedDateTimeInputPresentationComponent,
  CommonAutoCompletePresentationComponent,
  BorderedAutoCompletePresentationComponent,
  BorderedCommonSelectPresentationComponent
} from '../presentations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcInputsModule, NgxSfcInputsValidationModule } from 'ngx-sfc-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TextPresentationComponent,
    CommonTextPresentationComponent,
    BorderedTextPresentationComponent,
    TextAreaPresentationComponent,
    CommonTextAreaPresentationComponent,
    BorderedTextAreaPresentationComponent,
    FilePresentationComponent,
    FileInputPresentationComponent,
    CommonFileInputPresentationComponent,
    BorderedFileInputPresentationComponent,
    InlineFileInputPresentationComponent,
    CheckboxPresentationComponent,
    TogglePresentationComponent,
    TagsPresentationComponent,
    CommonTagsPresentationComponent,
    BorderedTagsPresentationComponent,
    NumberPresentationComponent,
    CommonNumberPresentationComponent,
    EditNumberPresentationComponent,
    StarsPresentationComponent,
    DateTimePresentationComponent,
    DateInputPresentationComponent,
    TimeInputPresentationComponent,
    DateTimeInputPresentationComponent,
    YearsInputPresentationComponent,
    BorderedDateTimeInputPresentationComponent,
    ImagePresentationComponent,
    RangePresentationComponent,
    HorizontalRangePresentationComponent,
    VerticalRangePresentationComponent,
    RadioPresentationComponent,
    HorizontalRadioPresentationComponent,
    VerticalRadioPresentationComponent,
    AutoCompletePresentationComponent,
    CommonAutoCompletePresentationComponent,
    BorderedAutoCompletePresentationComponent,
    SelectPresentationComponent,
    CommonSelectPresentationComponent,
    MultipleSelectPresentationComponent,
    GroupSelectPresentationComponent,
    BorderedCommonSelectPresentationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgxSfcCommonModule,
    NgxSfcInputsValidationModule,
    NgxSfcInputsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
