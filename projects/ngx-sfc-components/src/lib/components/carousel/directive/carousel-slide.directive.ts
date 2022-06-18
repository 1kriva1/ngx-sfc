import { Directive, Input, TemplateRef } from "@angular/core";
import { isNumeric } from "ngx-sfc-common";

let nextId = 0;

/* eslint-disable */
@Directive({ selector: 'ng-template[sfcCarouselSlide]' })
export class CarouselSlideDirective {

  @Input()
  id = `slide-${nextId++}`;

  private _dataMerge = 1;
  @Input()
  set dataMerge(data: number) {
    this._dataMerge = isNumeric(data) ? data : 1;
  };
  get dataMerge(): number { return this._dataMerge }

  @Input()
  width = 0;

  constructor(public tplRef: TemplateRef<any>) { }
}
