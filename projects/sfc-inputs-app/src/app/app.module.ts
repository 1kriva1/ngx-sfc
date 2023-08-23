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
  GroupSelectPresentationComponent
} from '../presentations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// import { NgxSfcCommonModule } from 'ngx-sfc-common';
// import { NgxSfcInputsModule, NgxSfcInputsValidationModule } from 'ngx-sfc-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSfcInputsValidationModule } from 'projects/ngx-sfc-inputs/src/lib/validators/ngx-sfc-inputs-validation.module';
import { NgxSfcInputsModule } from 'projects/ngx-sfc-inputs/src/lib/ngx-sfc-inputs.module';
import { NgxSfcCommonModule } from 'projects/ngx-sfc-common/src/lib/ngx-sfc-common.module';

@NgModule({
  declarations: [
    AppComponent,
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
    GroupSelectPresentationComponent
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
