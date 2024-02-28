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
  CollapseExpandDirective,
  IfDirective,
  ThrowElementOnHoverDirective,
  TemplateReferenceDirective,
  MouseDownDirective,
  ComponentSizeDirective,
  DestroyParentDirective,
  DomChangesDirective,
  ScrollTrackerDirective,
  ScrollIntoViewDirective,
  ImageLoadDirective,
  ComponentReferenceDirective
} from './directives';
import { SwitchMultiCasePipe, SortByPipe } from './pipes';
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
  LoadContainerComponent,
  LoadMoreButtonComponent,
  IconComponent,
  CollapseExpandComponent,
  CollapseExpandContainerComponent,
  ToggleComponent
} from './components';

@NgModule({
  declarations: [
    // directives
    ClickOutsideDirective,
    ShowHideElementDirective,
    CollapseExpandDirective,
    IfDirective,
    ThrowElementOnHoverDirective,
    TemplateReferenceDirective,
    MouseDownDirective,
    ComponentSizeDirective,
    DestroyParentDirective,
    DomChangesDirective,
    ScrollTrackerDirective,
    ScrollIntoViewDirective,
    ImageLoadDirective,
    ComponentReferenceDirective,
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
    LoadMoreButtonComponent,
    LoadContainerComponent,
    IconComponent,
    CollapseExpandComponent,
    CollapseExpandContainerComponent,
    ToggleComponent,
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
    SwitchMultiCasePipe,
    SortByPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    // directives
    ClickOutsideDirective,
    ShowHideElementDirective,
    CollapseExpandDirective,
    IfDirective,
    ThrowElementOnHoverDirective,
    TemplateReferenceDirective,
    MouseDownDirective,
    ComponentSizeDirective,
    DestroyParentDirective,
    DomChangesDirective,
    ScrollTrackerDirective,
    ScrollIntoViewDirective,
    ImageLoadDirective,
    ComponentReferenceDirective,
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
    LoadMoreButtonComponent,
    LoadContainerComponent,
    IconComponent,
    CollapseExpandComponent,
    CollapseExpandContainerComponent,
    ToggleComponent,
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
    SwitchMultiCasePipe,
    SortByPipe
  ],
  providers: [DOCUMENT_PROVIDERS, WINDOW_PROVIDERS]
})
export class NgxSfcCommonModule { }
