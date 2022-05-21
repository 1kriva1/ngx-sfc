import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Chart } from 'chart.js';
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
  AvatarBadgeComponent,
  ProgressLineComponent,
  ProgressSemiCircleComponent,
  ProgressCircleComponent,
  TagsComponent,
  SliderComponent,
  TimelineComponent,
  NotificationComponent,
  ChartComponent
} from './components';
import {
  DropdownMenuItemComponent,
  NavigationMenuItemComponent,
  SideMenuHeaderComponent,
  SideMenuItemComponent,
  SideMenuItemContentComponent,
  SideMenuTitleComponent,
  TagComponent,
  SliderItemComponent,
  SliderButtonComponent,
  SliderPaginationComponent,
  TimelineItemComponent,
  NotificationContentComponent
} from './components/no-export-index';

import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  TimeSeriesScale,
  Title,
  Tooltip
} from 'chart.js';
import { NgxSfcCommonModule } from 'ngx-sfc-common';

Chart.register(
  Title, Tooltip, Filler, Legend,
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  BarController, BarElement,
  DoughnutController, ArcElement,
  RadarController, RadialLinearScale,
  PieController,
  PolarAreaController,
  BubbleController,
  ScatterController,
  TimeSeriesScale);

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
    AvatarBadgeComponent,
    // Progress
    ProgressLineComponent,
    ProgressSemiCircleComponent,
    ProgressCircleComponent,
    // Tags
    TagsComponent,
    TagComponent,
    // Slider
    SliderComponent,
    SliderItemComponent,
    SliderButtonComponent,
    SliderPaginationComponent,
    // Timeline
    TimelineComponent,
    TimelineItemComponent,
    // Notification
    NotificationComponent,
    NotificationContentComponent,
    // Chart
    ChartComponent
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
    AvatarBadgeComponent,
    // Progress
    ProgressLineComponent,
    ProgressSemiCircleComponent,
    ProgressCircleComponent,
    // Tags
    TagsComponent,
    // Slider
    SliderComponent,
    // Timeline
    TimelineComponent,
    // Notification
    NotificationComponent,
    // Chart
    ChartComponent
  ]
})
export class NgxSfcComponentsModule { }
