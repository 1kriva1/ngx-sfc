import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { CheckmarkType, UIClass } from 'ngx-sfc-common';
import { TableSelectService } from '../../../service/select/table-select.service';
import { SelectableTableColumnConstants } from './selectable-table-column.constants';

@Component({
  selector: 'sfc-selectable-table-column',
  templateUrl: './selectable-table-column.component.html',
  styleUrls: ['./selectable-table-column.component.scss']
})
export class SelectableTableColumnComponent {

  CheckmarkType = CheckmarkType;

  @Input()
  @HostBinding(`class.${UIClass.Active}`)
  selected: boolean = false;

  @HostListener('click')
  selectAll() {
    this.selected = !this.selected;
    this.service.selectAll(this.selected);
  }

  public get label(): string {
    return this.selected
      ? SelectableTableColumnConstants.LABEL_UNSELECT
      : SelectableTableColumnConstants.LABEL_SELECT
  }

  constructor(private service: TableSelectService) { }
}
