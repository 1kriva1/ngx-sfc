import { Component, Input, QueryList, TemplateRef } from '@angular/core';
import { TemplateReferenceDirective } from '../../directives';
import { firstOrDefault, isDefined } from '../../utils';

@Component({
  selector: 'sfc-template-content',
  templateUrl: './template-content.component.html',
  styles: [':host{ display: contents;}']
})
export class TemplateContentComponent {

  @Input()
  contextData?: any;

  @Input()
  referenceContent?: TemplateRef<any>;

  @Input()
  templateType?: string;

  @Input()
  templatesContent: QueryList<TemplateReferenceDirective> | undefined;

  @Input()
  defaultContent?: TemplateRef<any>;

  get showDefault(): boolean {
    return !isDefined(this.referenceContent)
      && !isDefined(this.templateContent);
  }

  get templateContent(): TemplateRef<any> | null {
    const templateRef = firstOrDefault(this.templatesContent?.toArray(),
      t => t.templateName == this.templateType);

    return templateRef?.template || null;
  }
}
