import { AfterViewInit, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { Position } from "ngx-sfc-common";
import { fromEvent, Subscription } from "rxjs";
import { ITableSelectEvent } from "../../service/select/table-select.event";
import { IDefaultTableColumnInnerModel } from "../columns/table-column.model";
import { TableColumnType } from "../columns/table-column-type.enum";
import { ITableModel } from "../../models/table.model";
import { UIClass } from "ngx-sfc-common";

@Directive()
export abstract class BaseDefaultTableContentComponent implements AfterViewInit, OnDestroy {

    TableColumnType = TableColumnType;

    @Input()
    model: ITableModel = { dataModel: { data: {} }, index: 0 };

    @Input()
    columns: IDefaultTableColumnInnerModel[] = [];

    @Input()
    selectOnClick: boolean = false;

    @Input()
    position: Position = Position.Left;

    @Input()
    columnWidth: number = this.columns.length || 1;

    @Output()
    selected: EventEmitter<ITableSelectEvent> = new EventEmitter<ITableSelectEvent>();

    @ViewChild('columnCheckmark', { static: false })
    columnCheckmark!: ElementRef;

    _columnCheckmarkSubscription!: Subscription;

    @HostListener('click')
    onContentClick(): void {
        if (this.selectOnClick)
            this.selected.emit(this.selectEvent);
    }

    @HostBinding(`class.${UIClass.Even}`)
    get even(): boolean {
        return (this.model.index + 1) % 2 === 0;
    }

    @HostBinding(`class.${UIClass.Pointer}`)
    get pointer(): boolean {
        return this.selectOnClick;
    }

    ngAfterViewInit(): void {
        if (this.columnCheckmark) {
            this._columnCheckmarkSubscription = fromEvent(this.columnCheckmark.nativeElement, 'click')
                .subscribe((event: any) => {
                    if (this.selectOnClick)
                        event.stopPropagation();
                    this.selected.emit(this.selectEvent);
                });
        }
    }

    ngOnDestroy(): void {
        if (this._columnCheckmarkSubscription)
            this._columnCheckmarkSubscription.unsubscribe();
    }

    get selectEvent(): ITableSelectEvent {
        return { index: this.model.index, selected: !this.model.dataModel.selected };
    }
}