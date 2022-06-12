import { Component, Input } from '@angular/core';
import { getCalcValue, Position } from 'ngx-sfc-common';

@Component({
  selector: 'table-custom-expanded-row-content',
  templateUrl: './table-custom-expanded-row-content.component.html',
  styleUrls: ['./table-custom-expanded-row-content.component.scss']
})
export class TableCustomExpandedRowContentComponent {
  @Input()
  data!: any[];

  @Input()
  columnWidth: number = 0;

  @Input()
  position: Position = Position.Center;

  get columnStyle(): { width: string } {
    return {
      width: getCalcValue(this.columnWidth)
    };
  }
}