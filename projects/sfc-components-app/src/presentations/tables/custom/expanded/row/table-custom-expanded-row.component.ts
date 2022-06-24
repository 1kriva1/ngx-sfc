import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { getCalcValue, Position, UIClass } from 'ngx-sfc-common';
import { ITableDataModel, ITableSelectEvent } from 'ngx-sfc-components';
import { fromEvent, Subscription } from 'rxjs';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'table-custom-expanded-row',
  templateUrl: './table-custom-expanded-row.component.html',
  styleUrls: ['./table-custom-expanded-row.component.scss']
})
export class TableCustomExpandedRowComponent implements AfterViewInit, OnDestroy {

  @Input()
  index: number = 0;

  @Input()
  model!: ITableDataModel;

  @Input()
  columnWidth: number = 0;

  @Input()
  position: Position = Position.Center;

  @Input()
  @HostBinding(`class.` + UIClass.Expanded)
  expanded: boolean = false;

  @Output()
  selected: EventEmitter<ITableSelectEvent> = new EventEmitter<ITableSelectEvent>();

  @ViewChild('columnCheckmark', { static: false, read: ElementRef })
  columnCheckmarkEl!: ElementRef;

  columnCheckmarkOnClickSubscription!: Subscription;

  get icon(): IconDefinition {
    return this.expanded ? faAngleUp : faAngleDown;
  }

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

  get columnStyle(): { width: string } {
    return {
      width: getCalcValue(this.columnWidth)
    };
  }

  get isSelected() {
    return this.model.selected || false;
  }

  get data(): any {
    return this.model.data;
  }

  selectRow() {
    this.selected.emit({ index: this.index, selected: !this.isSelected });
  }
}