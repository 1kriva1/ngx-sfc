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
  MenusDropdownPresentationComponent,
  MenusNavigationPresentationComponent,
  StarsPresentationComponent,
  AvatarsPresentationComponent,
  ProgressLinePresentationComponent,
  ProgressPresentationComponent,
  ProgressCirclePresentationComponent,
  ProgressSemiCirclePresentationComponent,
  TagsPresentationComponent,
  SlidersPresentationComponent,
  TimelinesPresentationComponent,
  NotificationsPresentationComponent
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
    MenusDropdownPresentationComponent,
    MenusNavigationPresentationComponent,
    // stars
    StarsPresentationComponent,
    // avatars
    AvatarsPresentationComponent,
    // progress
    ProgressPresentationComponent,
    ProgressLinePresentationComponent,
    ProgressCirclePresentationComponent,
    ProgressSemiCirclePresentationComponent,
    // tags
    TagsPresentationComponent,
    // sliders
    SlidersPresentationComponent,
    // timelines
    TimelinesPresentationComponent,
    // notifications
    NotificationsPresentationComponent
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
