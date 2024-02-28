import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CheckmarkType, Position, UIClass } from 'ngx-sfc-common';
import { ITableColumnExtendedModel, ITableModel, TableColumnType, TableSelectService } from 'ngx-sfc-components';
import { fromEvent, Subscription } from 'rxjs';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'table-custom-expanded-row',
  templateUrl: './table-custom-expanded-row.component.html',
  styleUrls: ['./table-custom-expanded-row.component.scss']
})
export class TableCustomExpandedRowComponent implements AfterViewInit, OnDestroy {

  TableColumnType = TableColumnType;
  CheckmarkType = CheckmarkType;

  @Input()
  columns!: ITableColumnExtendedModel[];

  @Input()
  index: number = 0;

  @Input()
  model!: ITableModel;

  @Input()
  position: Position = Position.Center;

  @Input()
  @HostBinding(`class.` + UIClass.Expanded)
  expanded: boolean = false;

  @ViewChild('columnCheckmark', { static: false, read: ElementRef })
  columnCheckmarkEl!: ElementRef;

  columnCheckmarkOnClickSubscription!: Subscription;

  get icon(): IconDefinition {
    return this.expanded ? faAngleUp : faAngleDown;
  }

  constructor(private selectedService: TableSelectService) { }

  ngAfterViewInit(): void {
    if (this.columnCheckmarkEl) {
      this.columnCheckmarkOnClickSubscription = fromEvent(this.columnCheckmarkEl.nativeElement, 'click').subscribe((event: any) => {
        event.stopPropagation();
        this.selectRow();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.columnCheckmarkOnClickSubscription)
      this.columnCheckmarkOnClickSubscription.unsubscribe();
  }

  get isSelected(): boolean {
    return this.model.selected || false;
  }

  get data(): any {
    return this.model.data;
  }

  selectRow(): void {
    this.model.selected = !this.model.selected;
    this.selectedService.select(this.model.sequence, this.model.selected);
  }
}