import { Component, HostBinding, Input } from '@angular/core';
import { CommonConstants, UIClass } from 'ngx-sfc-common';
import { ITableColumnModel } from '../table-column.model';

@Component({
  selector: 'sfc-default-table-column',
  templateUrl: './default-table-column.component.html',
  styleUrls: ['./default-table-column.component.scss']
})
export class DefaultTableColumnComponent {

  @Input()
  model: ITableColumnModel = { name: CommonConstants.EMPTY_STRING, field: CommonConstants.EMPTY_STRING };

  @HostBinding(`class.${UIClass.Active}`)
  get active(): boolean {
    return this.model.sorting?.active || false;
  }
}
