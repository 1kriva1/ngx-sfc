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
import { TooltipComponent } from './components/tooltip/tooltip.component';

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
    TooltipComponent    
  ],
  providers: [DOCUMENT_PROVIDERS, WINDOW_PROVIDERS, ResizeService]
})
export class NgxSfcCommonModule { }
