import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSfcCommonModule } from 'ngx-sfc-common';

import {
  TabsComponent,
  TabLabelIconComponent,
  TabLabelIconSliderComponent,
  TabLabelLineComponent,
  TabLabelLineSliderComponent,
  SideMenuComponent
} from './components';
import { SideMenuHeaderComponent } from './components/menu/side/parts/header/side-menu-header.component';
import { SideMenuItemContentComponent } from './components/menu/side/parts/item/content/side-menu-item-content.component';
import { SideMenuItemComponent } from './components/menu/side/parts/item/side-menu-item.component';
import { SideMenuTitleComponent } from './components/menu/side/parts/title/side-menu-title.component';

@NgModule({
  declarations: [
    // Tabs
    TabsComponent,
    TabLabelLineComponent,
    TabLabelIconComponent,
    TabLabelLineSliderComponent,
    TabLabelIconSliderComponent,
    // Side menu
    SideMenuComponent,
    SideMenuHeaderComponent,
    SideMenuItemComponent,
    SideMenuTitleComponent,
    SideMenuItemContentComponent
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
    SideMenuComponent
  ]
})
export class NgxSfcComponentsModule { }
