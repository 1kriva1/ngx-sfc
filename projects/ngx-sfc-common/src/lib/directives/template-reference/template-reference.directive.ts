import { Directive, Input, TemplateRef } from '@angular/core';
import { CommonConstants } from '../../constants';

@Directive({
  selector: '[sfcTemplateReference]'
})
export class TemplateReferenceDirective {

  @Input('sfcTemplateReference')
  templateName: string = CommonConstants.EMPTY_STRING;

  @Input()
  data: any;

  constructor(public readonly template: TemplateRef<any>) { }
}
