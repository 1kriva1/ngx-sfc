import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  ComponentSizeDirective
} from './directives';
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
  TemplateContentComponent
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
    // components
    ButtonComponent,
    TooltipComponent,
    DelimeterComponent,
    // loaders
    BounceLoaderComponent,
    CircleLoaderComponent,
    // modal
    ModalComponent,
    ModalOpenOnClickDirective,
    DefaultModalHeaderComponent,
    DefaultModalFooterComponent,
    // hamburger
    HamburgerComponent,
    // dots
    DotsComponent,
    //toggle
    ToggleSwitcherComponent,
    CheckmarkComponent,
    TemplateContentComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    // directives
    ClickOutsideDirective,
    ShowHideElementDirective,
    ThrowElementOnHoverDirective,
    TemplateReferenceDirective,
    MouseDownDirective,
    ComponentSizeDirective,
    // components
    ButtonComponent,
    TooltipComponent,
    DelimeterComponent,
    // loaders
    BounceLoaderComponent,
    CircleLoaderComponent,
    // modal
    ModalComponent,
    ModalOpenOnClickDirective,
    DefaultModalHeaderComponent,
    DefaultModalFooterComponent,
    // hamburger
    HamburgerComponent,
    // dots
    DotsComponent,
    //toggle
    ToggleSwitcherComponent,
    CheckmarkComponent,
    TemplateContentComponent
  ],
  providers: [DOCUMENT_PROVIDERS, WINDOW_PROVIDERS]
})
export class NgxSfcCommonModule { }
