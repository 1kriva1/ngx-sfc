import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckmarkType, Position } from 'ngx-sfc-common';
import { ITableColumnExtendedModel, ITableModel, TableSelectService, TableColumnType } from 'ngx-sfc-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'table-custom-row',
  templateUrl: './table-custom-row.component.html',
  styleUrls: ['./table-custom-row.component.scss']
})
export class TableCustomRowComponent {

  faStar = faStar;

  CheckmarkType = CheckmarkType;
  TableColumnType = TableColumnType;

  @Input()
  columns!: ITableColumnExtendedModel[];

  @Input()
  model!: ITableModel;

  @Input()
  position: Position = Position.Center;

  get isSelected(): boolean {
    return this.model.selected || false;
  }

  get data(): any {
    return this.model.data;
  }

  constructor(private selectedService: TableSelectService) { }

  selectRow(): void {
    this.model.selected = !this.model.selected;
    this.selectedService.select(this.model.sequence, this.model.selected);
  }
}