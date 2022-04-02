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
  NavigationMenuComponent
} from './components';
import { SideMenuHeaderComponent } from './components/menu/side/parts/header/side-menu-header.component';
import { SideMenuItemContentComponent } from './components/menu/side/parts/item/content/side-menu-item-content.component';
import { SideMenuItemComponent } from './components/menu/side/parts/item/side-menu-item.component';
import { SideMenuTitleComponent } from './components/menu/side/parts/title/side-menu-title.component';
import { DropdownMenuItemComponent } from './components/menu/dropdown/parts/item/dropdown-menu-item.component';
import { NavigationMenuItemComponent } from './components/menu/navigation/parts/item/navigation-menu-item.component';

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
    NavigationMenuItemComponent
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
    NavigationMenuComponent
  ]
})
export class NgxSfcComponentsModule { }
