import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, ViewChild } from "@angular/core";
import { CheckmarkType, Position } from "ngx-sfc-common";
import { fromEvent, Subscription } from "rxjs";
import { ITableColumnExtendedModel } from "../columns/table-column.model";
import { TableColumnType } from "../columns/table-column-type.enum";
import { ITableModel } from "../../models/table.model";
import { UIClass } from "ngx-sfc-common";
import { TableSelectService } from "../../service/select/table-select.service";

@Directive()
export abstract class BaseDefaultTableContentComponent implements AfterViewInit, OnDestroy {

    TableColumnType = TableColumnType;
    CheckmarkType = CheckmarkType;

    @Input()
    model: ITableModel = {  data: {}, index: 0, sequence: 0 };

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    @Input()
    selectOnClick: boolean = false;

    @Input()
    position: Position = Position.Left;

    @ViewChild('columnCheckmark', { static: false })
    columnCheckmark!: ElementRef;

    _columnCheckmarkSubscription!: Subscription;

    @HostListener('click')
    onContentClick(): void {
        if (this.selectOnClick)
            this.select();
    }

    @HostBinding(`class.${UIClass.Even}`)
    get even(): boolean {
        return (this.model.index + 1) % 2 === 0;
    }

    @HostBinding(`class.${UIClass.Pointer}`)
    get pointer(): boolean {
        return this.selectOnClick;
    }

    constructor(private selectedService: TableSelectService) { }

    ngAfterViewInit(): void {
        if (this.columnCheckmark) {
            this._columnCheckmarkSubscription = fromEvent(this.columnCheckmark.nativeElement, 'click')
                .subscribe((event: any) => {
                    if (this.selectOnClick)
                        event.stopPropagation();

                    this.select();
                });
        }
    }

    ngOnDestroy(): void {
        if (this._columnCheckmarkSubscription)
            this._columnCheckmarkSubscription.unsubscribe();
    }

    private select(): void {
        this.model.selected = !this.model.selected;
        this.selectedService.select(this.model.sequence, this.model.selected);
    }
}