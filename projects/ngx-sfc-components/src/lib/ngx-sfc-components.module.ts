import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSfcCommonModule } from 'ngx-sfc-common';

import {
  TabsComponent,
  TabLabelIconComponent,
  TabLabelIconSliderComponent,
  TabLabelLineComponent,
  TabLabelLineSliderComponent
} from './components';

@NgModule({
  declarations: [
    // Tabs
    TabsComponent,
    TabLabelLineComponent,
    TabLabelIconComponent,
    TabLabelLineSliderComponent,
    TabLabelIconSliderComponent
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
    TabLabelIconSliderComponent
  ]
})
export class NgxSfcComponentsModule { }
