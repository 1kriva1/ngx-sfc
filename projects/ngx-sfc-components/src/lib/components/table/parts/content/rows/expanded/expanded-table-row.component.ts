import { Component, ContentChildren, HostBinding, Input, QueryList, TemplateRef } from '@angular/core';
import { TemplateReferenceDirective, UIClass } from 'ngx-sfc-common';
import { BaseDefaultTableContentComponent } from '../../base-default-table-content.component';
import { ExpandedTableRowTemplate } from './expanded-table-row-template.enum';
import { IExpandedTableRowContextModel } from './expanded-table-row.model';

@Component({
  selector: 'sfc-expanded-table-row',
  templateUrl: './expanded-table-row.component.html',
  styleUrls: ['./expanded-table-row.component.scss']
})
export class ExpandedTableRowComponent extends BaseDefaultTableContentComponent {

  ExpandedTemplate = ExpandedTableRowTemplate;

  @Input()
  @HostBinding('class.' + UIClass.Expanded)
  expanded: boolean = false;

  // Template references 

  @Input()
  row?: TemplateRef<any>;

  @Input()
  content?: TemplateRef<any>;

  // End template references 

  @ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
  templates: QueryList<TemplateReferenceDirective> | undefined;

  get contextData(): IExpandedTableRowContextModel {
    return {
      model: this.model,
      columns: this.columns,
      columnWidth: Math.max(1, this.columnWidth),
      position: this.position,
      expanded: this.expanded,
      even: this.even
    }
  }
}
