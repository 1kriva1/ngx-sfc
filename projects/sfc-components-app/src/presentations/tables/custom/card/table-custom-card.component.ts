import { Component, Input } from '@angular/core';
import { IDefaultTableColumnModel, ITableModel } from 'ngx-sfc-components';

@Component({
  selector: 'table-custom-card',
  templateUrl: './table-custom-card.component.html',
  styleUrls: ['./table-custom-card.component.scss']
})
export class TableCustomCardComponent {

  @Input()
  columns!: IDefaultTableColumnModel[];

  @Input()
  data!: ITableModel;

  get model(): any {
    return this.data.dataModel.data;
  }
}