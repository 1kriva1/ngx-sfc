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
  ButtonsRoundedFilledPresentationComponent,
  TooltipsPresentationComponent,
  LoadersPresentationComponent,
  LoadersBouncePresentationComponent,
  LoadersCirclePresentationComponent,
  LoadersCircleFadingPresentationComponent,
  ModalsPresentationComponent,
  ToggleSwitchersPresentationComponent,
  TabsPresentationComponent,
  TabsIconPresentationComponent,
  TabsLinePresentationComponent,
  MenusPresentationComponent,
  MenusSidePresentationComponent,
  MenusDropdownPresentationComponent 
} from '../presentations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // buttons
    ButtonsPresentationComponent,
    ButtonsBorderedPresentationComponent,
    ButtonsFilledPresentationComponent,
    ButtonsTextedPresentationComponent,
    ButtonsRoundedPresentationComponent,
    ButtonsCircledPresentationComponent,
    ButtonsRoundedFilledPresentationComponent,
    // tooltip
    TooltipsPresentationComponent,
    // loaders
    LoadersPresentationComponent,
    LoadersBouncePresentationComponent,
    LoadersCirclePresentationComponent,
    LoadersCircleFadingPresentationComponent,
    // modal
    ModalsPresentationComponent,
    // toggle switchers
    ToggleSwitchersPresentationComponent,
    // tabs
    TabsPresentationComponent,
    TabsLinePresentationComponent,
    TabsIconPresentationComponent,
    // menus
    MenusPresentationComponent,
    MenusSidePresentationComponent,
    MenusDropdownPresentationComponent 
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
export class AppModule {
}
