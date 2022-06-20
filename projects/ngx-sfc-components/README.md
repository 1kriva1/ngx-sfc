# ngx-sfc-components

This library contains components for Street Football Club (SFC) project.

## Table of Contents

- [Get started](#get-started)
- [Components](#components)
  - [Avatar](#avatar-sfc-avatar)
  - [Chart](#chart-sfc-chart)
  - [Menus](#menus)
    - [Side](#side-sfc-side-menu)
    - [Dropdown](#dropdown-sfc-dropdown-menu)
    - [Navigation](#navigation-sfc-navigation-menu)
  - [Notification](#notification-sfc-notification)
  - [Progresses](#progresses)
    - [Line](#line-sfc-progress-line)
    - [Semi-circle](#semi-circle-sfc-progress-semi-circle)
    - [Circle](#circle-sfc-progress-circle)

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
    
## Components  
  
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

## Menus

Several types of menus:

## **Side `<sfc-side-menu>`**

Side menu that can be expanded to the right and can have sub-menus.

 ```html
<sfc-side-menu [model]="MENU_MODEL_3" (selected)="onSelect($event)"></sfc-side-menu>
```

Parameters:
1. `[model]` - model for menu, contains info about constructed items of menu

```typescript
export interface ISideMenuModel {
    open: boolean; // expanded or not
    items: ISideMenuItemModel[];
}

export interface ISideMenuItemModel {
    active: boolean; // selected or not
    label: string;
    icon: string;
    type: SideMenuItemType;
    items?: ISideMenuItemModel[]; // if not empty - has sub-menu items
}

export enum SideMenuItemType {
    Item = 'item', 
    Title = 'title' // not selected
}
``` 

2. `(selected)` - emit handler for selecting menu items

## **Dropdown `<sfc-dropdown-menu>`**

Component allow to define context menu.

 ```html
<sfc-dropdown-menu [items]="MODEL" icon="fa fa-star" label="Test label" [hideOnClick]="false"
                   [hideOnClickOutside]="false" [bordered]="true" [position]="Position.Right"
                   [open]="false">
</sfc-dropdown-menu>
```

Parameters:
1. `[items]` - menu items

```typescript
export interface IDropdownMenuItemModel {
    label: string;
    icon?: string;
    delimeter?: boolean; // add dlimeter after menu item
    click?: (item: IDropdownMenuItemModel) => void; // click handler
}
``` 
2. `[icon]` - icon for menu item
3. `[label]` - menu item label
4. `[hideOnClick]` - if true, on item click - menu will be hidden
5. `[hideOnClickOutside]` - if true, when click outside menu - hide menu
6. `[bordered]` - add border to menu dots
7. `[position]` - define where menu wil be appear

```typescript
export enum Position {
    Top = 'top',
    Bottom = 'bottom',
    Left = 'left',
    Right = 'right',
    Center = 'center'
}
``` 

8. `[open]` - define if menu will be open on init

## **Navigation `<sfc-navigation-menu>`**

Simple responsive navigation menu.

 ```html
<sfc-navigation-menu [items]="MODEL" (selected)="onSelect($event)"></sfc-navigation-menu>
```

Parameters:
1. `[items]` - menu items

```typescript
export interface INavigationMenuItemModel {
    label: string;
    active: boolean; // define selected item
    icon?: string;
    click?: (item: INavigationMenuItemModel) => void;
}
``` 
2. `(selected)` - emit handler for selecting menu items

## **Notification `<sfc-notification>`**

Component created for implementing user notification with details and actions.

 ```html
<sfc-notification [model]="btnNotification" [showClose]="true" [autoCloseModel]="autoCloseModel" [type]="NotificationType.Info" 
                  [content]="contentRef" (closed)="onClose()" (buttonClicked)="onButtonClick()">
</sfc-notification>
```

Parameters:
1. `[model]` - notification model

```typescript
export interface INotificationContentModel {
    title?: string;
    subTitle?: string;
    showButton?: boolean;
    buttonText?: string;
    icon?: string;
    image?: string;
}
``` 

2. `[showClose]` - show/hide close icon
3. `[autoCloseModel]` - auto close notification model

```typescript
export interface INotificationAutoCloseModel {
    enabled: boolean;
    interval?: number; // after what time notification will be closed
}
``` 

4. `[type]` - UI type of notification

```typescript
export enum NotificationType {
    Info = 'info',
    Success = 'success',
    Failed = 'failed'
}
``` 

5. `[content]` - hold content reference for template, if it not provided and content template also missing, than default content will be created.
6. `(closed)` - emit handler for closing notification
7. `(buttonClicked)` - emit handler for default notification content button click


## Progresses

Several types of progress components:

## **Line `<sfc-progress-line>`**

Progress bar as line view

 ```html
<sfc-progress-line labelStart="Dribbling" labelEnd="value:55" [progress]="55" background="red" [getColor]="getColor"
                   [total]="100" [hideEnd]="true">
</sfc-progress-line>
```

Parameters:
1. `labelStart` - text at the start of bar line
2. `labelEnd` - text at the end of bar line
3. `[progress]` - progress value
4. `background` - color for background of line (not progressed part of line)
5. `[getColor]` - custom function for defined colors for progress value
6. `[total]` - max value for progress bar
7. `[hideEnd]` - show/hide progress value text or labelEnd value at the end of bar

## **Semi-circle `<sfc-progress-semi-circle>`**

Progress bar as semi-circle view

 ```html
 <sfc-progress-semi-circle background="green" [progress]="60" [getColor]="getColor" [limits]="true"
                           [max]="100" [min]="0">
 </sfc-progress-semi-circle>
```

Parameters:
1. `[progress]` - progress value
2. `background` - color for background of line (not progressed part of line)
3. `[getColor]` - custom function for defined colors for progress value
4. `[limits]` - show/hide min and max value text
5. `[min]` - minimum value
6. `[max]` - maximum value

## **Circle `<sfc-progress-circle>`**

Progress bar as circle view

 ```html
<sfc-progress-circle background="green" [progress]="60" [getColor]="getColor"></sfc-progress-circle>
```

Parameters:
1. `[progress]` - progress value
2. `background` - color for background of line (not progressed part of line)
3. `[getColor]` - custom function for defined colors for progress value
