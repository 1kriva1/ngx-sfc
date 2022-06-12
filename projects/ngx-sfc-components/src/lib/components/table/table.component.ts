import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, DoCheck, HostBinding, Inject, Input, IterableDiffer, IterableDiffers, OnInit, QueryList, TemplateRef } from '@angular/core';
import { all, firstOrDefault, getCalcValue, hasItemBy, isDefined, MediaLimits, PaginationService, Position, ResizeService, sortByPath, SortingDirection, SortingService, TemplateReferenceDirective, WINDOW } from 'ngx-sfc-common';
import { IPaginationEvent } from 'ngx-sfc-common';
import { ISortingEvent } from 'ngx-sfc-common';
import { BehaviorSubject, combineLatest, map, Observable, startWith } from 'rxjs';
import { TableColumnType } from './parts/columns/table-column-type.enum';
import { IDefaultTableColumnInnerModel, IDefaultTableColumnModel } from './parts/columns/table-column.model';
import { ColumnsToggleService } from './parts/toggle/service/columns-toggle.service';
import { ITableSelectEvent } from './service/select/table-select.event';
import { TableSelectService } from './service/select/table-select.service';
import { TableDataType } from './enums/table-data-type.enum';
import { ITablePaginationModel } from './models/table-pagination.model';
import { TableConstants } from './table.constants';
import { TableTemplate } from './enums/table-template.enum';
import { ITableDataModel, ITableModel } from './models/table.model';

@Component({
  selector: 'sfc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [PaginationService, SortingService, TableSelectService, ColumnsToggleService, ResizeService]
})
export class TableComponent implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, AfterViewChecked, DoCheck {

  TableDataType = TableDataType;
  TableColumnType = TableColumnType;
  TableTemplate = TableTemplate;
  Constants = TableConstants;

  @Input()
  position: Position = Position.Center;

  @Input()
  delimeter: boolean = false;

  @Input()
  @HostBinding('class')
  dataType: TableDataType = TableDataType.Rows;

  @Input()
  dataToggle: boolean = true;

  @Input()
  showColumns: boolean = true;

  @Input()
  pagination: ITablePaginationModel = { enabled: true, page: TableConstants.DEFAULT_PAGE, size: TableConstants.DEFAULT_PAGE_SIZE };

  @Input()
  sequence: boolean = false;

  @Input()
  expanded: boolean = false;

  @Input()
  selectable: boolean = false;

  @Input()
  selectOnClick: boolean = false;

  // Template references 

  @Input()
  columnContent?: TemplateRef<any>;

  @Input()
  rowContent?: TemplateRef<any>;

  @Input()
  cardContent?: TemplateRef<any>;

  // End Template references

  //Data

  @Input()
  data: ITableDataModel[] = [];

  @Input()
  set data$(value: Observable<ITableDataModel[]>) {
    this._data$ = value;
    this.paginationService.init(this._data$, this.pagination.page, this.pagination.size);
  }

  get data$(): Observable<ITableDataModel[]> {
    return this._data$;
  }
  private _data$!: Observable<ITableDataModel[]>

  private dataDiffer!: IterableDiffer<any>;

  private dataSubject!: BehaviorSubject<ITableDataModel[]>;

  private dataValue$!: Observable<ITableModel[]>;

  // End Data

  // Columns

  @Input()
  columns: IDefaultTableColumnModel[] = [];

  private columnsDiffer!: IterableDiffer<IDefaultTableColumnModel>;

  private columnsSubject: BehaviorSubject<IDefaultTableColumnModel[]> = new BehaviorSubject<IDefaultTableColumnModel[]>(this.columns);

  private columns$!: Observable<IDefaultTableColumnInnerModel[]>;

  private columnsSorting$!: Observable<IDefaultTableColumnInnerModel[]>;

  private columnWidth$!: Observable<number>;

  // End Columns  

  public allRowsSelected: boolean = false;

  public vm$!: Observable<any>;

  @ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
  templates: QueryList<TemplateReferenceDirective> | undefined;

  constructor(
    @Inject(WINDOW) private window: Window,
    private paginationService: PaginationService,
    private selectedService: TableSelectService,
    private sortingService: SortingService,
    private changeDetector: ChangeDetectorRef,
    private resizeService: ResizeService,
    private columnsToggleService: ColumnsToggleService,
    private iterableDiffers: IterableDiffers) {
    this.dataDiffer = iterableDiffers.find([]).create<IterableDiffer<ITableDataModel>>(undefined);
    this.columnsDiffer = iterableDiffers.find([]).create<IDefaultTableColumnModel>(undefined);
  }

  ngOnInit(): void {
    // if data is static, make it observable
    if (!isDefined(this.data$)) {
      this.dataSubject = new BehaviorSubject(this.data);
      this.data$ = this.dataSubject.asObservable();
    }

    // set up data models with indexes
    const dataIndexed$: Observable<ITableModel[]> = this.data$.pipe(map((data) => data.map((dataModel, index) => { return { index, dataModel } }))),
      // set up sorting observable
      sorting$: Observable<ISortingEvent | null> = this.getSortingObservable(),
      // set up selection observable
      selection$: Observable<ITableSelectEvent | null> = this.selectedService.select$.pipe(
        startWith(null)
      );

    // set up columns (conditionally add sequence or selectable columns)
    this.columns$ = this.columnsSubject.asObservable().pipe(
      map(columns => {
        let tableColumns = columns.slice(0);

        if (this.sequence)
          tableColumns.unshift(TableConstants.SEQUENCE_COLUMN);

        if (this.selectable)
          tableColumns.unshift(TableConstants.SELECTABLE_COLUMN);

        if (this.expanded)
          tableColumns.push(TableConstants.EXPANDED_COLUMN);

        return tableColumns;
      })
    );

    this.columnsSorting$ = combineLatest([this.columns$, sorting$]).pipe(
      map(([columns, event]) => {
        columns.forEach(column => {
          if (column.sorting?.enabled) {
            column.sorting.active = column.field == event?.id || false;

            if (!column.sorting.active)
              column.sorting.direction = SortingDirection.Ascending;
          }
        });

        return columns;
      })
    );

    // set up main data observable
    this.dataValue$ = combineLatest([
      dataIndexed$,
      this.paginationService.pagination$,
      sorting$,
      selection$
    ]).pipe(
      map(([data, paginationEvent, sortingEvent, selectionEvent]) => {
        // handle selection
        this.handleSelectionEvent(data, selectionEvent);

        // handle pagination and sorting
        let sortedData = this.sortData(data, sortingEvent),
          paginatedData = this.paginateData(sortedData, paginationEvent);

        // handle data sequence  
        if (this.sequence) {
          this.updateRowSequenceValues(paginationEvent.page, paginatedData)
        }

        return paginatedData;
      })
    );
  }

  ngAfterViewInit(): void {
    // combine all observable to view model
    this.vm$ = combineLatest([
      this.columnsSorting$,
      this.dataValue$,
      this.columnsToggleService.showColumns$,
      this.columnWidth$
    ]).pipe(
      map(([columns, data, showColumns, columnWidth]) => {
        return {
          columns,
          data,
          columnWidth,
          showColumns: this.showColumns && showColumns,
          columnStyle: { width: getCalcValue(columnWidth), justifyContent: this.position }
        }
      }
      ));
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngDoCheck() {
    if (this.dataDiffer.diff(this.data)) {
      this.dataSubject.next(this.data);
    }

    if (this.columnsDiffer.diff(this.columns)) {
      this.columnsSubject.next(this.columns);
    }
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngAfterContentInit(): void {
    this.columnWidth$ = combineLatest([
      this.resizeService.onResize$.pipe(startWith({})),
      this.columns$
    ]).pipe(map(([_, columns]) => this.getColumnWidth(this.window.innerWidth, columns.length)));
  }

  onDataTypeToggle(): void {
    this.dataType = this.dataType == TableDataType.Rows ? TableDataType.Cards : TableDataType.Rows;
  }

  selectRow(model: ITableSelectEvent): void {
    this.selectedService.select(model.index, model.selected);
  }

  private getSortingObservable(): Observable<ISortingEvent | null> {
    const firstSortingColumn: IDefaultTableColumnModel | undefined = firstOrDefault(this.columns, column => column?.sorting?.enabled || false);
    return this.sortingService.sorting$.pipe(
      startWith(firstSortingColumn ? { id: firstSortingColumn.field, direction: firstSortingColumn.sorting?.direction || SortingDirection.Ascending } : null)
    );
  }

  private getColumnWidth(windowWidth: number, columnsLength: number): number {
    if (windowWidth <= MediaLimits.Phone)
      return 1;

    if (windowWidth <= MediaLimits.Tablet)
      return Math.ceil(columnsLength / 2);

    return columnsLength;
  }

  private handleSelectionEvent(data: ITableModel[], selectionEvent: ITableSelectEvent | null): void {
    if (selectionEvent != null) {
      if (selectionEvent.index == null) {
        data.forEach(item => item.dataModel.selected = selectionEvent.selected);
      } else {
        data.forEach(item => {
          if (selectionEvent.index === item.index) {
            item.dataModel.selected = selectionEvent.selected;
          }
        });
      }
    }

    this.allRowsSelected = all(data, item => Boolean(item.dataModel.selected));
  }

  private paginateData(data: ITableModel[], paginationEvent: IPaginationEvent): ITableModel[] {
    let pagedData = this.pagination.enabled
      ? data.slice((paginationEvent.page - 1) * this.pagination.size, paginationEvent.page * this.pagination.size)
      : data;

    return pagedData;
  }

  private sortData(data: ITableModel[], sortingEvent: ISortingEvent | null): ITableModel[] {
    const sortedData = sortingEvent && hasItemBy(this.columns, col => col.field == sortingEvent.id)
      ? sortByPath(data, `dataModel.data.${sortingEvent.id}`, sortingEvent.direction)
      : data;

    return sortedData;
  }

  private updateRowSequenceValues(page: number, data: any[]) {
    let from = (page - 1) * this.pagination.size;
    data.forEach(item => {
      item.sequence = from + 1;
      from++;
    });
  }
}
