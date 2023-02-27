import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ScrollIntoViewDirective,
  ImageLoadDirective
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
  ModalOpenDirective,
  DefaultModalHeaderComponent,
  DefaultModalFooterComponent,
  HamburgerComponent,
  HamburgerMenuComponent,
  DotsComponent,
  ToggleSwitcherComponent,
  CheckmarkComponent,
  TemplateContentComponent,
  CloseComponent,
  PaginationComponent,
  SortingComponent,
  LoadContainerComponent,
  LoadMoreButtonComponent,
  IconComponent
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
    ImageLoadDirective,
    // components
    ButtonComponent,
    TooltipComponent,
    DelimeterComponent,
    ToggleSwitcherComponent,
    CheckmarkComponent,
    TemplateContentComponent,
    CloseComponent,
    HamburgerComponent,
    HamburgerMenuComponent,
    DotsComponent,
    PaginationComponent,
    SortingComponent,
    LoadMoreButtonComponent,
    LoadContainerComponent,
    IconComponent,
    // loaders
    BounceLoaderComponent,
    CircleLoaderComponent,
    // modal
    ModalComponent,
    ModalOpenDirective,
    ModalOpenOnClickDirective,
    DefaultModalHeaderComponent,
    DefaultModalFooterComponent,
    // pipes
    SwitchMultiCasePipe        
  ],
  imports: [
    CommonModule,
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
    ImageLoadDirective,
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
    HamburgerMenuComponent,
    PaginationComponent,
    SortingComponent,
    LoadMoreButtonComponent,
    LoadContainerComponent,
    IconComponent,
    // loaders
    BounceLoaderComponent,
    CircleLoaderComponent,
    // modal
    ModalComponent,
    ModalOpenDirective,
    ModalOpenOnClickDirective,
    DefaultModalHeaderComponent,
    DefaultModalFooterComponent,
    // pipes
    SwitchMultiCasePipe        
  ],
  providers: [DOCUMENT_PROVIDERS, WINDOW_PROVIDERS]
})
export class NgxSfcCommonModule { }
