import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  DOCUMENT_PROVIDERS,
  WINDOW_PROVIDERS
} from './services';
import {
  ClickOutsideDirective,
  ShowHideElementDirective,
  ThrowElementOnHoverDirective,
  TemplateReferenceDirective,
  MouseDownDirective,
  ComponentSizeDirective,
  DestroyParentDirective,
  DomChangesDirective,
  ScrollTrackerDirective,
  ScrollIntoViewDirective
} from './directives';
import { SwitchMultiCasePipe } from './pipes';
import {
  ButtonComponent,
  TooltipComponent,
  DelimeterComponent,
  BounceLoaderComponent,
  CircleLoaderComponent,
  ModalComponent,
  ModalOpenOnClickDirective,
  DefaultModalHeaderComponent,
  DefaultModalFooterComponent,
  HamburgerComponent,
  DotsComponent,
  ToggleSwitcherComponent,
  CheckmarkComponent,
  TemplateContentComponent,
  CloseComponent,
  PaginationComponent,
  SortingComponent
} from './components';

@NgModule({
  declarations: [
    // directives
    ClickOutsideDirective,
    ShowHideElementDirective,
    ThrowElementOnHoverDirective,
    TemplateReferenceDirective,
    MouseDownDirective,
    ComponentSizeDirective,
    DestroyParentDirective,
    DomChangesDirective,
    ScrollTrackerDirective,
    ScrollIntoViewDirective,
    // components
    ButtonComponent,
    TooltipComponent,
    DelimeterComponent,
    ToggleSwitcherComponent,
    CheckmarkComponent,
    TemplateContentComponent,
    CloseComponent,
    HamburgerComponent,
    DotsComponent,
    PaginationComponent,
    SortingComponent,
    // loaders
    BounceLoaderComponent,
    CircleLoaderComponent,
    // modal
    ModalComponent,
    ModalOpenOnClickDirective,
    DefaultModalHeaderComponent,
    DefaultModalFooterComponent,
    // pipes
    SwitchMultiCasePipe
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  exports: [
    // directives
    ClickOutsideDirective,
    ShowHideElementDirective,
    ThrowElementOnHoverDirective,
    TemplateReferenceDirective,
    MouseDownDirective,
    ComponentSizeDirective,
    DestroyParentDirective,
    DomChangesDirective,
    ScrollTrackerDirective,
    ScrollIntoViewDirective,
    // components
    ButtonComponent,
    TooltipComponent,
    DelimeterComponent,
    CloseComponent,
    CheckmarkComponent,
    TemplateContentComponent,
    ToggleSwitcherComponent,
    DotsComponent,
    HamburgerComponent,
    PaginationComponent,
    SortingComponent,
    // loaders
    BounceLoaderComponent,
    CircleLoaderComponent,
    // modal
    ModalComponent,
    ModalOpenOnClickDirective,
    DefaultModalHeaderComponent,
    DefaultModalFooterComponent,
    // pipes
    SwitchMultiCasePipe
  ],
  providers: [DOCUMENT_PROVIDERS, WINDOW_PROVIDERS]
})
export class NgxSfcCommonModule { }
