import { Directive, Input, TemplateRef } from '@angular/core';
import { CommonConstants } from '../../constants';

@Directive({
  selector: '[sfc-template-reference]'
})
export class TemplateReferenceDirective {

  @Input('sfc-template-reference')
  templateName: string = CommonConstants.EMPTY_STRING;

  constructor(public readonly template: TemplateRef<any>) { }
}
