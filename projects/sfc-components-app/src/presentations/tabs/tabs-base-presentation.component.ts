import { Directive } from "@angular/core";
import { ComponentSize } from "ngx-sfc-common";
import { ITabModel, TabsTemplate } from "ngx-sfc-components";

@Directive()
export class TabsBasePresentation{
    readonly LONG_TEXT = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet eget lectus eu congue. Nam finibus urna eget nisl aliquam, in dictum ligula feugiat. Donec mollis ligula purus, et interdum velit bibendum eget. Aliquam magna diam, tristique eu libero nec, sagittis finibus sapien. Cras a ex ultricies, faucibus elit sagittis, maximus nisi. Donec quis arcu sapien. Aenean risus nibh, varius sed porttitor a, ornare nec leo. Sed vitae lacus in ipsum varius sagittis. Ut in quam cursus, ullamcorper sapien posuere, laoreet elit. Suspendisse interdum, risus ut ultricies scelerisque, nibh est commodo leo, sed tristique nisl odio et turpis. Fusce pellentesque nunc nec arcu feugiat accumsan. Praesent mauris sem, eleifend sit amet tortor in, cursus vehicula arcu. Curabitur convallis sit amet nunc ac feugiat. Sed at risus id diam porta pretium id vel felis. Donec nec dui id nisl hendrerit laoreet eu id odio.';

    TabsTemplate = TabsTemplate;
    
    ComponentSize = ComponentSize;

    MODELS: ITabModel[] = [
        {
            label: 'Tab line 1',
            icon: '',
            disabled: false,
            selected: false,
            data: this.LONG_TEXT
        },
        {
            label: 'Tab line 2',
            icon: '',
            disabled: false,
            selected: false,
            data: 'I ma second tab'
        },
        {
            label: 'Tab line 3',
            icon: '',
            disabled: false,
            selected: false,
            data: this.LONG_TEXT
        },
        {
            label: 'Tab line 4',
            icon: '',
            disabled: false,
            selected: false,
            data: 'I am forth content'
        },
        {
            label: 'Tab line 5',
            icon: '',
            disabled: false,
            selected: false,
            data: 'I am fifth content'
        }
    ];

    MODEL_ICONS: any = [];

    MODEL_DISABLED: any = [];

    MODEL_SELECTED: any = [];

    MODEL_EMPTY: any = [];

    MODEL_TWO: any = [];

    MODEL_ONE: any = [];

    constructor() {
        this.MODELS.forEach((val: any) => this.MODEL_ICONS.push(Object.assign({}, val)));
        this.MODEL_ICONS.forEach((item: any) => {
            item.icon = 'fa fa-car'
        });

        this.MODELS.forEach((val: any) => this.MODEL_DISABLED.push(Object.assign({}, val)));
        this.MODEL_DISABLED.forEach((item: any, index: number) => {
            item.disabled = index % 2 == 0 ? true : false;
        });

        this.MODELS.forEach((val: any) => this.MODEL_SELECTED.push(Object.assign({}, val)));
        this.MODEL_SELECTED.forEach((item: any, index: number) => {
            if (index == 4)
                item.selected = true;
        });

        this.MODELS.slice(0, 2).forEach((val: any) => this.MODEL_TWO.push(Object.assign({}, val)));

        this.MODELS.slice(0, 1).forEach((val: any) => this.MODEL_ONE.push(Object.assign({}, val)));
    }
}