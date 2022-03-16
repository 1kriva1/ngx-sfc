import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import { NgxSfcComponentsModule } from 'ngx-sfc-components';
import {
  ButtonsPresentationComponent,
  ButtonsBorderedPresentationComponent,
  ButtonsFilledPresentationComponent,
  ButtonsTextedPresentationComponent,
  ButtonsRoundedPresentationComponent,
  ButtonsCircledPresentationComponent,
  ButtonsRoundedFilledPresentationComponent
} from '../presentations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsPresentationComponent,
    ButtonsBorderedPresentationComponent,
    ButtonsFilledPresentationComponent,
    ButtonsTextedPresentationComponent,
    ButtonsRoundedPresentationComponent,
    ButtonsCircledPresentationComponent,
    ButtonsRoundedFilledPresentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
