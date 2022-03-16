import { NgModule } from '@angular/core';
import { DOCUMENT_PROVIDERS, ResizeService, WINDOW_PROVIDERS } from './services';
import {
  ClickOutsideDirective,
  ShowHideElementDirective,
  ThrowElementOnHoverDirective,
  TemplateReferenceDirective,
  MouseDownDirective,
  ComponentSizeDirective
} from './directives';
import { ButtonComponent } from './components'
import { CommonModule } from '@angular/common';

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
    ButtonComponent    
  ],
  providers: [DOCUMENT_PROVIDERS, WINDOW_PROVIDERS, ResizeService]
})
export class NgxSfcCommonModule { }
