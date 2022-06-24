import {
    Directive, HostBinding, Input
} from "@angular/core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { UIClass } from "ngx-sfc-common";

@Directive()
export class TabLabelContentBase {

    @Input()
    label?: string;

    @Input()
    icon?: IconDefinition;

    @Input()
    @HostBinding('class.' + UIClass.Disabled)
    disabled: boolean = false;

    @Input()
    @HostBinding('class.' + UIClass.Selected)
    selected = false;
}
