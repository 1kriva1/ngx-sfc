import { Directive, Input, TemplateRef } from "@angular/core";

/* eslint-disable */
@Directive({ selector: 'ng-template[sfcCarouselInputSlide]' })
export class CarouselInputSlideDirective {

  @Input('sfcCarouselInputSlide')
  key!: number;

  constructor(public template: TemplateRef<any>) { }
}