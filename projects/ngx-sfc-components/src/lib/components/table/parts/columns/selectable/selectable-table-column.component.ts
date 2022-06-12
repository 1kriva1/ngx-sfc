import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { UIClass } from 'ngx-sfc-common';
import { TableSelectService } from '../../../service/select/table-select.service';

@Component({
  selector: 'sfc-selectable-table-column',
  templateUrl: './selectable-table-column.component.html',
  styleUrls: ['./selectable-table-column.component.scss']
})
export class SelectableTableColumnComponent {

  @Input()
  @HostBinding(`class.${UIClass.Active}`)
  selected: boolean = false;

  @HostListener('click')
  selectAll() {
    this.selected = !this.selected;
    this.service.selectAll(this.selected);
  }

  constructor(private service: TableSelectService) { }
}
