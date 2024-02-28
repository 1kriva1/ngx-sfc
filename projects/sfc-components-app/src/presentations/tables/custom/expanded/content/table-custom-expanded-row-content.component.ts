import { Component, Input } from '@angular/core';
import { Position } from 'ngx-sfc-common';
import { TableColumnType, ITableColumnExtendedModel } from 'ngx-sfc-components';

@Component({
  selector: 'table-custom-expanded-row-content',
  templateUrl: './table-custom-expanded-row-content.component.html',
  styleUrls: ['./table-custom-expanded-row-content.component.scss']
})
export class TableCustomExpandedRowContentComponent {
  
  TableColumnType = TableColumnType;

  @Input()
  columns!: ITableColumnExtendedModel[];

  @Input()
  data!: any[];

  @Input()
  position: Position = Position.Center;
}