import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  NotificationsPresentationComponent,
  ChartsPresentationComponent,
  ChartsLinePresentationComponent,
  ChartsBarPresentationComponent,
  ChartsPiePresentationComponent,
  ChartsDoughnutPresentationComponent,
  ChartsRadarPresentationComponent,
  ChartsPolarPresentationComponent,
  TablesPresentationComponent,
  TablesDefaultPresentationComponent,
  TablesCustomPresentationComponent,
  TableBadgeComponent,
  TableCustomRowComponent,
  TableCustomColumnComponent,
  TableCustomCardComponent,
  TableCustomExpandedRowComponent,
  TableCustomExpandedRowContentComponent,
  CarouselPresentationComponent,
  LoadContainerPresentationComponent,
  LoadContainerItemComponent
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
    NotificationsPresentationComponent,
    // charts
    ChartsPresentationComponent,
    ChartsLinePresentationComponent,
    ChartsBarPresentationComponent,
    ChartsPiePresentationComponent,
    ChartsDoughnutPresentationComponent,
    ChartsRadarPresentationComponent,
    ChartsPolarPresentationComponent,
    // tables
    TablesPresentationComponent,
    TablesDefaultPresentationComponent,
    TablesCustomPresentationComponent,
    TableBadgeComponent,
    TableCustomColumnComponent,
    TableCustomRowComponent,
    TableCustomCardComponent,
    TableCustomExpandedRowComponent,
    TableCustomExpandedRowContentComponent,
    // carousels
    CarouselPresentationComponent,
    // load container
    LoadContainerPresentationComponent,
    LoadContainerItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxSfcCommonModule,
    NgxSfcComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
