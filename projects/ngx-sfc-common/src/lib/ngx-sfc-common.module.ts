import { NgModule } from '@angular/core';
import { DOCUMENT_PROVIDERS, ResizeService, WINDOW_PROVIDERS } from './services';
import {
  ClickOutsideDirective,
  ShowHideElementDirective,
  ThrowElementOnHoverDirective,
  TemplateReferenceDirective,
  MouseDownDirective
} from './directives';

@NgModule({
  declarations: [
    // directives
    ClickOutsideDirective,
    ShowHideElementDirective,
    ThrowElementOnHoverDirective,
    TemplateReferenceDirective,
    MouseDownDirective
  ],
  imports: [
  ],
  exports: [
    // directives
    ClickOutsideDirective,
    ShowHideElementDirective,
    ThrowElementOnHoverDirective,
    TemplateReferenceDirective,
    MouseDownDirective
  ],
  providers: [DOCUMENT_PROVIDERS, WINDOW_PROVIDERS, ResizeService]
})
export class NgxSfcCommonModule { }
