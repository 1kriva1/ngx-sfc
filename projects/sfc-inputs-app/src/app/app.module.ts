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
  TogglePresentationComponent
} from '../presentations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcInputsModule, NgxSfcInputsValidationModule } from 'ngx-sfc-inputs';

@NgModule({
  declarations: [
    AppComponent,
    TextPresentationComponent,
    TextAreaPresentationComponent,
    FilePresentationComponent,
    FileInputPresentationComponent,
    InlineFileInputPresentationComponent,
    CheckboxPresentationComponent,
    TogglePresentationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxSfcCommonModule,
    NgxSfcInputsValidationModule,
    NgxSfcInputsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
