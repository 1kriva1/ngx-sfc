import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSfcCommonModule } from 'ngx-sfc-common';
import {
  TabsComponent,
  TabLabelIconComponent,
  TabLabelIconSliderComponent,
  TabLabelLineComponent,
  TabLabelLineSliderComponent,
  SideMenuComponent,
  DropdownMenuComponent,
  NavigationMenuComponent,
  StarsComponent,
  AvatarComponent,
  AvatarBadgeComponent
} from './components';
import {
  DropdownMenuItemComponent,
  NavigationMenuItemComponent,
  SideMenuHeaderComponent,
  SideMenuItemComponent,
  SideMenuItemContentComponent,
  SideMenuTitleComponent
} from './components/no-export-index';

@NgModule({
  declarations: [
    // Tabs
    TabsComponent,
    TabLabelLineComponent,
    TabLabelIconComponent,
    TabLabelLineSliderComponent,
    TabLabelIconSliderComponent,
    // Menus
    SideMenuComponent,
    SideMenuHeaderComponent,
    SideMenuItemComponent,
    SideMenuTitleComponent,
    SideMenuItemContentComponent,
    DropdownMenuComponent,
    DropdownMenuItemComponent,
    NavigationMenuComponent,
    NavigationMenuItemComponent,
    // Stars
    StarsComponent,
    // Avatar
    AvatarComponent,
    AvatarBadgeComponent
  ],
  imports: [
    CommonModule,
    NgxSfcCommonModule
  ],
  exports: [
    // Tabs
    TabsComponent,
    TabLabelLineComponent,
    TabLabelIconComponent,
    TabLabelLineSliderComponent,
    TabLabelIconSliderComponent,
    // Menus
    SideMenuComponent,
    DropdownMenuComponent,
    NavigationMenuComponent,
    // Stars
    StarsComponent,
    // Avatar
    AvatarComponent,
    AvatarBadgeComponent
  ]
})
export class NgxSfcComponentsModule { }
