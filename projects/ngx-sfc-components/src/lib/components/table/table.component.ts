import {
  AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component, ContentChildren,
  DoCheck, EventEmitter, HostBinding, Inject, Input, IterableDiffer, IterableDiffers, OnDestroy,
  OnInit, Output, QueryList, TemplateRef
} from '@angular/core';
import {
  all, firstOrDefault, getCalcValue, getCssLikeValue, isDefined,
  MediaLimits, Position, ResizeService, SortingDirection, TemplateReferenceDirective, WINDOW,
  UIConstants, LoadContainerType, LoaderFunction, LoadContainerLoadType, ILoadContainerModel,
  ILoadContainerResultModel, IPaginationModel, PaginationConstants, generateGuid, any,
  hasItem, SortingService, ISortingModel, ILoadContainerPredicateParameters, FilterFunction, UIClass, IToggleSwitcherModel
} from 'ngx-sfc-common';
import { BehaviorSubject, filter, map, Observable, Subscription } from 'rxjs';
import { TableColumnType } from './parts/columns/table-column-type.enum';
import { ITableColumnExtendedModel, ITableColumnModel } from './parts/columns/table-column.model';
import { ColumnsToggleService } from './parts/toggle/service/columns-toggle.service';
import { ITableSelectEvent } from './service/select/table-select.event';
import { TableSelectService } from './service/select/table-select.service';
import { TableDataType } from './enums/table-data-type.enum';
import { TableConstants } from './table.constants';
import { TableTemplate } from './enums/table-template.enum';
import { ITableModel } from './models/table.model';
import { faTableList, faBorderAll } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sfc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [SortingService, TableSelectService, ColumnsToggleService, ResizeService]
})
export class TableComponent implements OnInit, AfterContentChecked, AfterViewChecked, DoCheck, OnDestroy {

  TableDataType = TableDataType;
  TableColumnType = TableColumnType;
  TableTemplate = TableTemplate;
  Constants = TableConstants;
  LoadContainerType = LoadContainerType;

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
  columnsToggle: boolean = false;

  @Input()
  pagination: IPaginationModel = PaginationConstants.DEFAULT_PAGINATION;

  @Input()
  sequence: boolean = false;

  @Input()
  expanded: boolean = false;

  @Input()
  notFoundLabel: string = this.Constants.NOT_FOUND_LABEL_DEFAULT;

  @Input()
  loadMoreLabel: string = this.Constants.LOAD_MORE_LABEL_DEFAULT;

  @Input()
  showTotal: boolean = false;

  @Input()
  totalLabel: string = this.Constants.TOTAL_LABEL_DEFAULT;

  @Input()
  paginationCount: number = PaginationConstants.DEFAULT_COUNT;

  @Input()
  paginationLimits: boolean = false;

  @Input()
  showLoading: boolean = true;

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
  data: any[] = [];

  @Input()
  data$!: Observable<any[]>;

  private dataDiffer!: IterableDiffer<any>;

  private dataSubject!: BehaviorSubject<any[]>;

  // End Data

  // Columns

  @Input()
  columns: ITableColumnModel[] = [];

  @Input()
  showColumnsLabel!: string;

  @Input()
  hideColumnsLabel!: string;

  @Input()
  resize: boolean = true;

  private columnsDiffer!: IterableDiffer<ITableColumnModel>;

  private columnsSubject: BehaviorSubject<ITableColumnModel[]> = new BehaviorSubject<ITableColumnModel[]>(this.columns);

  public tableColumns: ITableColumnExtendedModel[] = [];

  // End Columns  

  // Load container

  @Input()
  loadType: LoadContainerLoadType = LoadContainerLoadType.Pagination;

  @Input()
  loader!: LoaderFunction;

  @Input()
  filter?: FilterFunction;

  @Input()
  predicate$!: Observable<ILoadContainerPredicateParameters | null>;

  public loadModel!: ILoadContainerModel;

  public loadContainerId: string = generateGuid();

  public items: ITableModel[] = [];

  public total: number = 0;

  private page: number = PaginationConstants.DEFAULT_PAGE;

  @HostBinding(`class.${UIClass.Loading}`)
  public loading: boolean = false;

  // End Load container

  // Selection

  @Input()
  selectable: boolean = false;

  @Input()
  selectOnClick: boolean = false;

  @Output()
  selected: EventEmitter<ITableSelectEvent> = new EventEmitter<ITableSelectEvent>();

  public get allRowsSelected(): boolean {
    return (this.allSelected || this.total == this.selectedService.selectedItems.length)
      && !any(this.selectedService.unselectedItems)
      && any(this.items);
  };

  private allSelected: boolean = false;

  private _allSelectionSubscription!: Subscription;

  // End Selection

  // Data toggle

  @Input()
  dataListLabel: string = this.Constants.DATA_LIST_LABEL;

  @Input()
  dataCardsLabel: string = this.Constants.DATA_CARDS_LABEL;

  public toggleSwitcherLeftModel!: IToggleSwitcherModel;

  public toggleSwitcherRightModel!: IToggleSwitcherModel;

  // End data toggle

  public vm$!: Observable<any>;

  private _columnsResizeSubscription!: Subscription;

  private _columnsSubscription!: Subscription;

  private _sortingSubscription!: Subscription;

  private get initialSorting(): ISortingModel | null {
    const activeSortingColumn = firstOrDefault(this.columns, column => column.sorting?.active!);

    if (activeSortingColumn)
      return { id: activeSortingColumn.field, direction: activeSortingColumn.sorting?.direction! };

    const enabledSortingColumn = firstOrDefault(this.columns, column => column.sorting?.enabled!);

    return enabledSortingColumn ? { id: enabledSortingColumn.field, direction: enabledSortingColumn.sorting?.direction! } : null;
  }

  @ContentChildren(TemplateReferenceDirective, { read: TemplateReferenceDirective })
  templates: QueryList<TemplateReferenceDirective> | undefined;

  constructor(
    public columnsToggleService: ColumnsToggleService,
    @Inject(WINDOW) private window: Window,
    private selectedService: TableSelectService,
    private sortingService: SortingService,
    private changeDetector: ChangeDetectorRef,
    private resizeService: ResizeService,
    private iterableDiffers: IterableDiffers) {
    this.dataDiffer = iterableDiffers.find([]).create<IterableDiffer<any>>(undefined);
    this.columnsDiffer = iterableDiffers.find([]).create<ITableColumnModel>(undefined);
  }

  ngOnInit(): void {
    // if data is static, make it observable
    if (!isDefined(this.data$)) {
      this.dataSubject = new BehaviorSubject(this.data);
      this.data$ = this.dataSubject.asObservable();
    }

    if (this.selectable)
      this.selectionSubscribe();

    // set up columns (conditionally add sequence, selectable and expand columns)
    this.columnsSubscribe();

    if (this.resize)
      this.resizeSubscribe();

    this.sortingSubscribe();

    this.loadModel = {
      predicate$: this.predicate$,
      data$: this.data$,
      loader: this.loader,
      filter: this.filter,
      loadType: this.loadType,
      pagination: this.pagination,
      sorting: this.initialSorting
    };

    this.toggleSwitcherLeftModel = { label: this.dataListLabel, icon: faTableList };
    this.toggleSwitcherRightModel = { label: this.dataCardsLabel, icon: faBorderAll };
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngDoCheck(): void {
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

  ngOnDestroy(): void {
    this._allSelectionSubscription?.unsubscribe();
    this._columnsResizeSubscription?.unsubscribe();
    this._columnsSubscription?.unsubscribe();
    this._sortingSubscription?.unsubscribe();
  }

  public onDataTypeToggle(): void {
    this.dataType = this.dataType == TableDataType.Rows
      ? TableDataType.Cards
      : TableDataType.Rows;
  }

  public handleSuccess(result: ILoadContainerResultModel<any>): void {
    this.page = result.page;
    this.total = result.total;

    const items: ITableModel[] = result.items.map((item, index) => {
      const sequence = (index + 1) + ((this.page * this.pagination.size) - this.pagination.size);
      return {
        index: index,
        sequence: sequence,
        selected: this.getItemSelected(sequence),
        data: item
      };
    });

    if (result.reset)
      this.items = items;
    else
      this.items = this.items.concat(items);
  }

  private selectionSubscribe(): void {
    this._allSelectionSubscription = this.selectedService.select$
      .subscribe((event: ITableSelectEvent) => {
        if (event.index == null) {
          this.allSelected = event.selected;
          this.items.forEach(item => item.selected = event.selected);
        }

        this.selected.emit(event);
      });
  }

  private resizeSubscribe(): void {
    this._columnsResizeSubscription = this.resizeService.onResize$
      .subscribe(() => this.tableColumns.forEach(column =>
        column.calculatedWidth = this.calculateColumnWidth(column, this.tableColumns.length)));
  }

  private columnsSubscribe(): void {
    this._columnsSubscription = this.columnsSubject.asObservable().pipe(
      filter(columns => any(columns)),
      map((columns: ITableColumnModel[]) => {
        let tableColumns = JSON.parse(JSON.stringify(columns));

        if (this.sequence)
          tableColumns.unshift(TableConstants.SEQUENCE_COLUMN);

        if (this.selectable)
          tableColumns.unshift(TableConstants.SELECTABLE_COLUMN);

        if (this.expanded)
          tableColumns.push(TableConstants.EXPANDED_COLUMN);

        // calculated width not work without deep copy
        return JSON.parse(JSON.stringify(tableColumns));
      })
    ).subscribe((columns: ITableColumnExtendedModel[]) => {
      columns.forEach((column: ITableColumnExtendedModel) => {
        column.calculatedWidth = this.calculateColumnWidth(column, columns.length);

        const sortingColumn = this.initialSorting;
        if (this.initialSorting) {
          this.setColumnSorting(column, sortingColumn?.id!)
        }
      });

      this.tableColumns = columns;
    });
  }

  private sortingSubscribe(): void {
    this._sortingSubscription = this.sortingService.sorting$.subscribe((sortingEvent) =>
      this.tableColumns.forEach((column: ITableColumnExtendedModel) => this.setColumnSorting(column, sortingEvent?.id)));
  }

  private calculateColumnWidth(column: ITableColumnExtendedModel, columnsLength: number): string {
    // defined width for all columns
    if (all(this.columns, column => isDefined(column.width)))
      return getCssLikeValue(column.width!, UIConstants.CSS_PERCENTAGE);

    let width: number = columnsLength;

    if (this.window.innerWidth <= MediaLimits.MobileLarge)
      width = 1;
    else if (this.window.innerWidth <= MediaLimits.Tablet)
      width = Math.ceil(columnsLength / 2);

    return getCalcValue(width);
  }

  private setColumnSorting(column: ITableColumnExtendedModel, sortingId: string): void {
    if (column.sorting?.enabled) {
      column.sorting.active = column.field == sortingId;

      if (!column.sorting.active)
        column.sorting.direction = SortingDirection.Ascending;
    }
  }

  private getItemSelected(sequence: number): boolean {
    return this.allSelected
      ? !hasItem(this.selectedService.unselectedItems, sequence)
      : hasItem(this.selectedService.selectedItems, sequence);
  }
}
