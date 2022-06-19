# ngx-sfc-components

This library contains components for Street Football Club (SFC) project.

## Table of Contents

- [Get started](#get-started)
- [Components](#components)
  - [Avatar](#avatar-sfc-avatar)
  - [Chart](#chart-sfc-chart)

## Get started

1. Run `npm install ngx-sfc-components` or `ng add ngx-sfc-components`.
2. Import `NgxSfcCommonModule` into a module where you intend to use components and directives:

    ```typescript
    import { NgxSfcComponentsModule } from 'ngx-sfc-components';
    @NgModule({
      imports: [ NgxSfcComponentsModule ]
    })
    export class SomeModule { }
    ```
    
## **Avatar `<sfc-avatar>`**

Component display player/user rounded photo image with progress bar and information. Allowed to add player rating as stars view and add badges for additional info.

 ```html
<sfc-avatar [radius]="160" [stroke]="1" [progress]="50" [progressModel]="progressColor" [stars]="true" [starsValue]="2.15" [data]="dataImage">
                <sfc-avatar-badge [position]="AvatarBadgePosition.Right" [background]="'#8CC152'">
                    <i class="fa fa-copyright"></i>
                </sfc-avatar-badge>
</sfc-avatar>
```  

Parameters:
1. `[radius]` - define avatar size (component size must be used with relevance to this value)
2. `[stroke]` - size of avatar progress circle
3. `[progress]` - set value for avatar's progress line
4. `[progressModel]` - model that define color for progress line

```typescript
export interface IAvatarProgressModel {
    color?: string;
    filledColor?: string;
}
```  

5. `[data]` - provide information about player/user

```typescript
export interface IAvatarDataModel {
    firstName?: string;
    lastName?: string;
    image?: string;
    title?: string;
}
``` 
6. `[stars]` - show/hide stars as player raiting
7. `[starsValue]` - value for stars

Avatar's badge has two parameters:
1. `[background]` - background color
2. `[position]` - static position of badge

```typescript
export enum AvatarBadgePosition {
    Top = 'top',
    RightTop = 'right-top',
    Right = 'right',
    RightBottom = 'right-bottom',
    Bottom = 'bottom',
    LeftTop = 'left-top',
    Left = 'left',
    LeftBottom = 'left-bottom',
}
``` 

## **Chart `<sfc-chart>`**

It's a component wrapper on chart.js library with extra logic for theming and displaying charts.

 ```html
<sfc-chart [theme]="theme" [type]="chartType" [options]="verticalChartOptions" [chartOptions]="chartOptions" [data]="getData()"
           [datasets]="datasets" [labels]="labels" [plugins]="plugins">
</sfc-chart>
```  

Parameters:
1. `[type]` - chart type (line, bar, pie, doughnut, radar and polar)
2. `[theme]` - support two themes (default and dark)

```typescript
export enum Theme {
    Default = 'sfc-default-theme',
    Dark = 'sfc-dark-theme'
}
``` 

3. `[options]` - chart.js options
4. `[chartOptions]` - options for setting frequently used chart.js options

```typescript
export interface ChartOptionModel {
    legend?: boolean;
    gridLines?: boolean;
    xAxe?:boolean;
    yAxe?:boolean;
    tooltip?: boolean;
    ticks?: boolean;
    defaultColors?: boolean;
}
``` 

5. `[data]` - chart.js data
6. `[plugins]` - chart.js plugins
7. `[datasets]` - chart.js datasets
8. `[labels]` - chart.js labels
