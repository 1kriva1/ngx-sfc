import { Component, Input } from '@angular/core';
import { ITableColumnModel, ITableModel } from 'ngx-sfc-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'table-custom-card',
  templateUrl: './table-custom-card.component.html',
  styleUrls: ['./table-custom-card.component.scss']
})
export class TableCustomCardComponent {

  faStar = faStar;

  @Input()
  columns!: ITableColumnModel[];

  @Input()
  data!: ITableModel;

  get model(): any {
    return this.data;
  }
}