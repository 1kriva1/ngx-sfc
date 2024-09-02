import { Component, HostBinding, Input } from "@angular/core";
import { UIClass } from "ngx-sfc-common";

@Component({
    selector: 'sfc-carousel-schema',
    templateUrl: './carousel-schema.component.html',
    styleUrls: ['./carousel-schema.component.scss']
})
export class CarouselSchemaComponent {

    @Input()
    @HostBinding('class.' + UIClass.Active)
    active: boolean = false;

    @Input()
    @HostBinding('class.' + UIClass.Disabled)
    disabled: boolean = false;

    @Input()
    schema: number[] = [];
}