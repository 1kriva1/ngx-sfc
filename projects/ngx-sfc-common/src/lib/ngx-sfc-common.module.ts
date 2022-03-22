import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DOCUMENT_PROVIDERS,
  ResizeService, WINDOW_PROVIDERS
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
  ModalService,
  HamburgerComponent
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
    BounceLoaderComponent,
    CircleLoaderComponent,
    // modal
    ModalComponent,
    ModalOpenOnClickDirective,
    DefaultModalHeaderComponent,
    DefaultModalFooterComponent,
    // hamburger
    HamburgerComponent
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
    BounceLoaderComponent,
    CircleLoaderComponent,
    // modal
    ModalComponent,
    ModalOpenOnClickDirective,
    DefaultModalHeaderComponent,
    DefaultModalFooterComponent,
    // hamburger
    HamburgerComponent
  ],
  providers: [DOCUMENT_PROVIDERS, WINDOW_PROVIDERS, ResizeService, ModalService]
})
export class NgxSfcCommonModule { }
