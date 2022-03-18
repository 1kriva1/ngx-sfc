import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  DelimeterComponent
} from './components'


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

  ],
  imports: [
    CommonModule
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
    DelimeterComponent
  ],
  providers: [DOCUMENT_PROVIDERS, WINDOW_PROVIDERS, ResizeService]
})
export class NgxSfcCommonModule { }
