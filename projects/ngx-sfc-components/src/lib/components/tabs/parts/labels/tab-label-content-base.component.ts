import {
    Directive, HostBinding, Input
} from "@angular/core";
import { faCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { isDefined, UIClass } from "ngx-sfc-common";

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

    get tabIcon(): IconDefinition {
        return isDefined(this.icon) ? this.icon as IconDefinition : faCircle;
    }
}
