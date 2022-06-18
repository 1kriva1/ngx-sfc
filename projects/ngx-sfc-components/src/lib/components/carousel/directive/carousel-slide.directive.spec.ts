import { TemplateRef } from '@angular/core';
import { CarouselSlideDirective } from './carousel-slide.directive';

describe('Directive: CarouselSlide', () => {
  fit('should create an instance', () => {
    const directive = new CarouselSlideDirective({} as TemplateRef<any>);
    expect(directive).toBeTruthy();
  });
});
