import { Component, Input } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';

@Component({
  selector: 'table-custom-column',
  templateUrl: './table-custom-column.component.html',
  styleUrls: ['./table-custom-column.component.scss']
})
export class TableCustomColumnComponent {

  @Input()
  label: string = CommonConstants.EMPTY_STRING;

  @Input()
  active: boolean = false;
}