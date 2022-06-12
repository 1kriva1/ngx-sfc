import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getCalcValue, Position } from 'ngx-sfc-common';
import { IDefaultTableColumnModel, ITableModel, ITableSelectEvent } from 'ngx-sfc-components';

@Component({
  selector: 'table-custom-row',
  templateUrl: './table-custom-row.component.html',
  styleUrls: ['./table-custom-row.component.scss']
})
export class TableCustomRowComponent {

  @Input()
  columns!: IDefaultTableColumnModel[];

  @Input()
  data!: ITableModel;

  @Input()
  columnWidth: number = 0;

  @Input()
  position: Position = Position.Center;

  @Output()
  selected: EventEmitter<ITableSelectEvent> = new EventEmitter<ITableSelectEvent>();

  get columnStyle(): { width: string } {
    return {
      width: getCalcValue(this.columnWidth)
    };
  }

  get isSelected() {
    return this.data.dataModel.selected || false;
  }

  get model(): any {
    return this.data.dataModel.data;
  }

  selectRow() {
    this.selected.emit({ index: this.data.index, selected: !this.isSelected });
  }
}