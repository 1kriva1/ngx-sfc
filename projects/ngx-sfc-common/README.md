# ngx-sfc-common

This is shared library for Street Football Club (SFC) project, that contains components, directives, utils, enums and constants that will be used in related libraries: [ngx-sfc-inputs](https://github.com/1kriva1/ngx-sfc/tree/master/projects/ngx-sfc-inputs) and [ngx-sfc-components](https://github.com/1kriva1/ngx-sfc/tree/master/projects/ngx-sfc-components).

## Table of Contents

- [Get started](#get-started)
- [Directives](#directives)
  - [Click out side](#click-out-side-sfcclickoutside)
  - [Component size](#component-size-sfccomponentsize)
  - [Destroy parent](#destroy-parent-sfcdestroyparent)
  - [Mouse down](#mouse-down-sfcmousedown)
  - [Show/Hide element](#showhide-element-sfcshowhideelement)
  - [Template reference](#template-reference-sfctemplatereference)
  - [Throw element on hover](#throw-element-on-hover-sfcthrowelementonhover)
- [Components](#components)
  - [Button](#button-sfc-button)
  - [Checkmark](#checkmark-sfc-checkmark)
  - [Close](#close-sfc-close)
  - [Delimeter](#delimeter-sfc-delimeter)
  - [Dots](#dots-sfc-dots)
  - [Hamburger](#hamburger-sfc-hamburger)
  - [Loader](#loader-sfc-bounce-loader-sfc-circle-loader)
  - [Modal](#modal-sfc-modal)
  - [Pagination](#pagination-sfc-pagination)
  - [Sorting](#sorting-sfc-sorting)
  - [Template-content](#template-content-sfc-template-content)
  - [Toggle-switcher](#toggle-switcher-sfc-toggle-switcher)
  - [Tooltip](#tooltip-sfc-tooltip)
- [Services](#services)
  - [Resize](#resize)
- [Utils](#utils)

## Get started

1. Run `npm install ngx-sfc-common` or `ng add ngx-sfc-common`.
2. Import `NgxSfcCommonModule` into a module where you intend to use components and directives:

    ```typescript
    import { NgxSfcCommonModule } from 'ngx-sfc-common';
    @NgModule({
      imports: [ NgxSfcCommonModule ]
    })
    export class SomeModule { }
    ```

## Directives

## **Click out side `[sfcClickOutside]`**

This directive can be usefull when need to detect if click event occured on specific HTML element (or it descendants) or outside it.

Add directive `[sfcClickOutside]` to element that you whant to check:

```html
<div class="target" [sfcClickOutside]="value" (action)="onClick($event)"></div>
```

Parameters:
1. `[sfcClickOutside]="value"` - if value is true, directive will listen click events, othervise ignoring.
2. `(action)` - function to handle click events

After clicking, directive will emit `ClickOutsideEvent` event for `(action)` output function.

`ClickOutsideEvent` has such structure:

```typescript
export interface ClickOutsideEvent {
    target: EventTarget | null;
    value: boolean;
}
```
1. `target` - clicked element
2. `value` - true if clicked outside target element (which has directive on it)
    
## **Component size `[sfcComponentSize]`**

This directive allow to set defined size (Small, Medium or Large) or custom size in `em` units on element.

Add `[sfcComponentSize]` with value `ComponentSize` or add `[customSize]` for setting custom size:

```html
 <div class="target" [sfcComponentSize]="ComponentSize.Small" [customSize]="customSize">
```   

Parameters:
1. `sfcComponentSize` expect enum `ComponentSize` value

`ComponentSize` has three posible values:

ComponentSize | CSS Value
--------------|-----------
Small         | 0.5em
Medium        | 1em
Large         | 2em

2. `customSize` - custom size as number (`em` unit will be added)

## **Destroy parent `[sfcDestroyParent]`**

This directive allow to destroy parent element of directive owner.

Add `[sfcDestroyParent]` with value `destroy` and optionaly can define delay by `delay` value (e.g. after 10 ms will destroy):

```html
 <div class="container" [sfcDestroyParent]="destroy" [delay]="10">
``` 
Parameters:
1. `sfcDestroyParent` expect boolean value, if true - will destroy parent element
2. `delay` - define delay before destroying, by default 0.

## **Mouse down `(sfcMouseDown)`**

This directive allow clicking only by specific mouse button (by default allow left button click).

Add `(sfcMouseDown)="click($event)"` for defined click event handler and `[button]` to define what mouse button allowed to do this click:

```html
<div class="target" (sfcMouseDown)="click($event)" [button]="button">
```   

Parameters:
1. `(sfcMouseDown)` - if button allowed this action will be emitted
2. `button` - define button, which will be allowed for clicking

## **Show/Hide element `[sfcShowHideElement]`**

This directive allow to show or hide element with delay.

Add `[sfcShowHideElement]="show"` for defined show or hide element and `[delay]` for delay between show and hide states:

```html
<div class="target" [sfcShowHideElement]="show" [delay]="delay">
```    

Parameters:
1. `[sfcShowHideElement]` - if pass true value, than show element, otherwise hide
2. `[delay]` - delay for show/hide animation (0.5s by default)

## **Template reference `[sfcTemplateReference]`**

This directive allow to define templates by name and query these templates as array inside component.

Add `ng-template` with directive `[sfcTemplateReference]="ModalTemplate.Header"` (`ModalTemplate.Header` it's a name for template):

```html
<ng-template [sfcTemplateReference]="ModalTemplate.Header">
        <div>
            <div>{{HEADER_MODEL.Title}}</div>
            <fa-icon [icon]="HEADER_MODEL.Icon"></fa-icon>
            <button (click)="FOOTER_MODEL.Click()">hide model</button>
        </div>
</ng-template>
```    

Inside component query all templates by directive:

```typescript
@ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
private templates: QueryList<TemplateReferenceDirective> | undefined;
 ```    

Get template by name `templateName`:

```typescript
const templateRef = firstOrDefault(this.templates?.toArray(),
      t => t.templateName == ModalTemplate.Header);
```    

Parameters:
1. `[sfcTemplateReference]` - name(identificator) for template

## **Throw element on hover `[sfcThrowElementOnHover]`**

This directive allow to throw element on `mouseenter` by Y axis and than back element on `mouseleave`.

Add directive `[sfcThrowElementOnHover]` with throw power `value`:

```html
<div class="target" [sfcThrowElementOnHover]="value">
```    

Parameters:
1. `[sfcThrowElementOnHover]` - with which power will throw element

## Components

## **Button `<sfc-button>`**

Button component allow to define several visualization types, add text, icons before and after text and make button disabled.

 ```html
<sfc-button [iconBefore]="faStar" text="Button" [iconAfter]="faCar" [disabled]="false" [types]="[ButtonType.Rounded,ButtonType.Filled]">        
</sfc-button>
```   

Parameters:
1. `iconBefore` - icon before text
2. `iconAfter` - icon after text
3. `text` - button text
4. `[disabled]` - disable button
5. `[types]` - visualization types

Visualization types:
1. Bordered - `ButtonType.Bordered`
2. Filled - `ButtonType.Filled`
3. Texted - `ButtonType.Texted`
4. Circled - `ButtonType.Circled`
5. Rounded - `ButtonType.Rounded`

Types can be combinated.

## **Checkmark `<sfc-checkmark>`**

Check mark with possibility to change icon value. Can be used for checking rows in table rows.

```html
<sfc-checkmark [active]="value" [icon]="faStar"></sfc-checkmark>
```    

Parameters:
1. `[active]` - check value, if checked - will have true value
2. `icon` - icon value inside checkmark (default value - `fa fa-check`)

## **Close `<sfc-close>`**

Close icon. Used in notification and modal components.

```html
<sfc-close *ngIf="show" (click)="onClose()"></sfc-close>
```  

## **Delimeter `<sfc-delimeter>`**

Can be used for separate element on UI.

```html
<sfc-delimeter></sfc-delimeter>
```    

## **Dots `<sfc-dots>`**

Dots component for toggling menues or dropdowns visibility.

```html
<sfc-dots [open]="open" [direction]="Direction.Horizontal"></sfc-dots>
```    

Parameters:
1. `[open]` - define open/close state
2. `[direction]` - dots direction

Directions:
1. Horizontal - `Direction.Horizontal`
2. Vertical - `Direction.Vertical`

## **Hamburger `<sfc-hamburger>`**

Hamburger element for toggling menues.

 ```html
<sfc-hamburger [open]="open"></sfc-hamburger>
```
    
Parameters:
1. `[open]` - define open/close state

## **Loader `<sfc-bounce-loader>, <sfc-circle-loader>`**

 Loader component allow to show/hide loaders on specific elements or globally on all window object. 

 There two types of loaders:
 1. Global - `id` value must be NULL
 2. Local - `id` value is required and must be unique

 Add `<sfc-bounce-loader>` loader component:

 ```html
<sfc-bounce-loader id="bounceLoader" [start]="true"></sfc-bounce-loader>
```  

 Add `<button>` for showing and hidding loader (just for example):

```html
<button (click)="showLoader('bounceLoader')">Show</button>
<button (click)="hideLoader('bounceLoader')">Hide</button>
 ```    

Inject `LoaderService` inside component:

```typescript
constructor(private loaderService: LoaderService) { }
```   

Add `showLoader` and `hideLoader` methods for buttons:

```typescript
public showLoader(id?: string): void {
    this.loaderService.show(id);
}

public hideLoader(id?: string): void {
    this.loaderService.hide(id);
}
```   

There are several types for visual representations of loaders:
1. Bounce - `<sfc-bounce-loader>`
2. Circle - `<sfc-circle-loader>`
3. Circle-fading - `<sfc-circle-loader [type]="CircleLoaderType.Fading">`

Additional parameters:
1. `[start]` - start loading on loader init (false by default)
2. `[background]` - add overlay on loading (true by default)

## **Modal `<sfc-modal>`**

Component allow to add/remove modal on all window object. 
Modal contains three main parts: `header`, `body` and `footer`. All these parts can be replaced by reference or content templates. 
If reference and content templates not provided, `header` and `footer` parts have default implementation.

Register button as modal handler by directive `*sfcModalOpenOnClick`. When click on this button, modal will add/removed:

```html
<button #defaultModalBtn>Default modal</button>
<sfc-modal *sfcModalOpenOnClick="defaultModalBtn"></sfc-modal>
 ```    

Possible severals handlers:

```html
<button #defaultOneModalBtn>Button 1</button>
<button #defaultSecondModalBtn>Button 1</button>
<sfc-modal *sfcModalOpenOnClick="[defaultOneModalBtn, defaultSecondModalBtn]"></sfc-modal>
```    

Examles of setting modal parts:

- References:

```html
<ng-template #headerRef>
    <div>
        <div>{{HEADER_MODEL.Title}}</div>
    </div>
</ng-template>

<ng-template #footerRef>
    <div>
        <div>{{FOOTER_MODEL.Title}}</div>
    </div>
</ng-template>

<sfc-modal [header]="headerRef" [footer]="footerRef"></sfc-modal>
```    

- Templates:

```html
<sfc-modal>
    <ng-template [sfcTemplateReference]="ModalTemplate.Header">
        <div>
                <div>{{HEADER_MODEL.Title}}</div>
        </div>
    </ng-template>
    <ng-template [sfcTemplateReference]="ModalTemplate.Footer">
        <div>
                <div>{{FOOTER_MODEL.Title}}</div>
        </div>
    </ng-template>
</sfc-modal>
```    

Modal can be added/removed by `ModalService`:

```typescript
constructor(private modalService: ModalService) { }

// open
this.modalService.open();

// close
this.modalService.close();
```    

Additional parameters:
1. `hideOnEsc` - if true, than modal can be removed on Escape button (by default true)
2. `hideOnClickOutside` - if true, than modal can be removed on click outside of modal (by default true)

## **Pagination `<sfc-pagination>`**

Component allow to paginate data for example for tables.

```html
<sfc-pagination [count]="3" [limits]="false" [full]="false" [data$]="data$"></sfc-pagination>
```

Parameters:
1. `[count]` - max limit for pagination buttons
2. `[full]` - show or not full range of data
3. `[limits]` - show or not first/last pagination button
4. `[data$]` - pagination data observable

## **Sorting `<sfc-sorting>`**

Add posibility to emit sorting for specific data. Can add template for displaying UI, also component will add default or defined by model sorting icons. When click on component, sorting event will be emitted.

```html
<sfc-sorting [id]="column.field" [model]="column.sorting">
  <sfc-default-table-column [model]="column"></sfc-default-table-column>
</sfc-sorting>
```

Parameters:
1. `[id]` - sorting ID
2. `[model]` - sorting model

Model contract:

```typescript
export interface ISortingModel {
    enabled: boolean; // enable sorting
    active?: boolean; // is current sorting is active
    direction: SortingDirection; // direction - asc or desc
    icons?: ISortingIcon[]; // custom icons for sorting
}

export interface ISortingIcon {
    direction: SortingDirection;
    icon: string
}
``` 

## **Template-content `<sfc-template-content>`**

Component allow to insert template as template reference or as template content. Also can be defined default content.

```html
<sfc-template-content [referenceContent]="header" [templatesContent]="templates"
                [templateType]="ModalTemplate.Header" [defaultContent]="defaultHeader">
</sfc-template-content>

<ng-template #defaultHeader>
    <sfc-default-modal-header [model]="defaultHeaderModel"></sfc-default-modal-header>
</ng-template>
```

Parameters:
1. `[referenceContent]` - reference template
2. `[templatesContent]` - content templates

```typescript
@ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
templates: QueryList<TemplateReferenceDirective> | undefined;
```

 3. `[templateType]` - type for content templates

```typescript
export enum ModalTemplate {
    Body = 'body',
    Header = 'header',
    Footer = 'footer'
}
``` 
4. `[defaultContent]` - reference for default content

## **Toggle-switcher `<sfc-toggle-switcher>`**

Component allow to add toggler with posibility to define text and icon for left and right part of component. 
Can be used for toggling dark and light themes on page, toggling table types (rows or cards).

```html
<sfc-toggle-switcher [active]="false" [leftModel]="{label:'test1', icon:faCar}"
        [rightModel]="{label:'test1', icon:faStar}">
</sfc-toggle-switcher>
```

Parameters:
1. `[active]` - if true, toggler will move to right side
2. `[leftModel]` - left model
3. `[rightModel]` - right model

Model contract:

```typescript
export interface IToggleSwitcherModel {
   label: string,
   icon?: string;
}
```    

## **Tooltip `<sfc-tooltip>`**

Allow to add texted tooltip for element and define appearance position. 
Also component has two types - show tooltip on hower and show tooltip on click.

```html
<p sfc-tooltip="tooltip content" [tooltipPosition]="Position.Left" [tooltipType]="TooltipType.Click" [tooltipShow]="false">
```    

Parameters:
1. `sfc-tooltip` - texted content of tooltip
2. `[tooltipShow]` - show/hide tooltip
3. `[tooltipPosition]` - tooltip appearance position
4. `[tooltipType]` - type of tooltip

Positions:
- Top - `Position.Top`
- Bottom - `Position.Bottom`
- Left - `Position.Left`
- Right - `Position.Right`

Types:
- Hover - `TooltipType.Hover`
- Click - `TooltipType.Click`

## Services

## **Resize**

Service will emit on every window's resize event and provide current state of window object.

Inject service:

```typescript
constructor(private resizeService: ResizeService) { }
```    

Subscribe on resize observable and handle emit result:

```typescript
this._resizeSubscription = this.resizeService.onResize$
      .pipe(startWith(this.window))
      .subscribe(window => this.tooltipPosition = window.innerWidth <= MediaLimits.Tablet
        ? Position.Bottom : this._position);
```
    
## Utils

- `Collection` utils
 
    Methods for array(collection) opearations.
    
```typescript
/**
 * Return true if collection not empty
 * @param collection Array of items
 * @returns True if collection not empty
 */
export function any<T>(collection: Array<T> | null | undefined): boolean {
    return isDefined(collection) && (collection as Array<T>).length > 0;
}
```
- `Common` utils

    Methods for object checking, modification and operations.
 
 ```typescript
/**
 * Return true if value defined
 * @param value Value to check
 * @returns True if value is not null and defined
 */
export function isDefined<T>(value: T | undefined | null): boolean {
    return <T>value !== undefined && <T>value !== null;
}
```

- `DateTime` utils

    Method for DATETime objects.
    
```typescript
/**
 * Return first day of month as date from date value
 * @param date Date value
 * @returns First day of month as date
 */
export function getFirstDayOfMonth(date: Date): Date {
    if (isDefined(date) && date instanceof Date) {
        const year = date.getFullYear(),
            month = date.getMonth();
        return new Date(year, month, 1);
    }

    return date;
}
```
  
- `File` utils

    Methods for IO and files.
  
```typescript
/**
 * Return parsed file size as string
 * @param bytes Bytes count
 * @param decimals Value after dot
 * @returns Parsed file size
 */
export function parseFileSize(bytes: number, decimals = 2): string {
    if (bytes === 0)
        return '0';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
```
  
- `String` utils

    Methods for strings modification and operations on them.
  
```typescript
/**
 * Return true if string has value(not empty string)
 * @param value String value to check
 * @returns True if string is not null and defined(not empty string)
 */
export function isNullOrEmptyString(value: string | undefined | null) {
    return !isDefined(value) || value === CommonConstants.EMPTY_STRING;
}
```
  
- `UI` utils

    Methods for UI operations.
  
```typescript
/**
 * Return CSS like value
 * @param value Value as number
 * @returns Value as '1px'
 */
export function getCssLikeValue(value: number,
    type: string = UIConstants.CSS_PIXELS): string {
    return value + type;
}
```
