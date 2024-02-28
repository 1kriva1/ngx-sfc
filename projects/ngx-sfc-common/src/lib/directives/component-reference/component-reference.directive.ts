import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[sfcComponentReference]',
  exportAs: 'componentRef',
})
export class ComponentReferenceDirective {
  constructor(public elementRef: ElementRef) { }
}