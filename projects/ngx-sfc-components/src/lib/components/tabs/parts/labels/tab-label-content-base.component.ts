import {
    Directive, HostBinding, Input
} from "@angular/core";
import { UIClass } from "ngx-sfc-common";

@Directive()
export class TabLabelContentBase {

    @Input()
    label?: string;

    @Input()
    icon?: string;

    @Input()
    @HostBinding('class.' + UIClass.Disabled)
    disabled: boolean = false;

    @Input()
    @HostBinding('class.' + UIClass.Selected)
    selected = false;
}
