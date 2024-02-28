import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  CommonConstants, ILoadContainerLoaderResultModel, ILoadContainerParameters, ILoadContainerPredicateParameters,
  IPaginationModel,
  isNullOrEmptyString, LoaderFunction, Position, skip, sortBy, where
} from 'ngx-sfc-common';
import { ComponentSize, SortingDirection } from 'ngx-sfc-common';
import { ITableColumnModel, TableDataType } from 'ngx-sfc-components';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, startWith, tap, delay } from 'rxjs';
import { faCar, faPen, faSortAsc, faSortDesc, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './tables-default-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss'],
  styles: ['.component-column{ display: initial !important; text-align: center;}']
})
export class TablesDefaultPresentationComponent implements OnInit, AfterViewChecked {

  ComponentSize = ComponentSize;
  Position = Position;
  TableDataType = TableDataType;

  // columns
  columnsDefault: ITableColumnModel[] = [];
  columnsSorting: ITableColumnModel[] = [];
  columnsSelectable: ITableColumnModel[] = [];
  columnsModification: ITableColumnModel[] = [];
  columnsCards: ITableColumnModel[] = [];
  columnsFull: ITableColumnModel[] = [];

  // data
  dataDefault: any[] = [];
  dataSync: any[] = [];
  dataAsync: any[] = [];
  dataInitialSync: any[] = [];
  dataColumnModifications: any[] = [];
  dataAsync$!: Observable<any[]>;
  dataSubject!: BehaviorSubject<any[]>;

  pagination: IPaginationModel = { page: 2, size: 2 };

  // forms
  filterSyncFormGroup: UntypedFormGroup = new UntypedFormGroup({
    searchSyncData: new UntypedFormControl()
  });

  filterAsyncFormGroup: UntypedFormGroup = new UntypedFormGroup({
    searchAsyncData: new UntypedFormControl()
  });

  filterLoaderFormGroup: UntypedFormGroup = new UntypedFormGroup({
    searchLoaderData: new UntypedFormControl()
  });

  loaderPredicate$!: Observable<ILoadContainerPredicateParameters | null>;

  asyncPredicate$!: Observable<ILoadContainerPredicateParameters | null>;

  syncPredicate$!: Observable<ILoadContainerPredicateParameters | null>;

  loader!: LoaderFunction;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    // default
    this.columnsDefault = this.getColumns();
    this.dataDefault = this.getData();

    // sorting
    this.columnsSorting = this.getColumns();
    this.columnsSorting.forEach(column => {
      column.sorting = {
        enabled: true,
        direction: SortingDirection.Descending,
        icons: [{ direction: SortingDirection.Ascending, icon: faSortAsc }, { direction: SortingDirection.Descending, icon: faSortDesc }]
      }
    });

    // selectable
    this.columnsSelectable = this.getColumns();
    this.columnsSelectable.forEach((column, index) => {
      if (index % 2 == 0)
        column.icon = faCar;
    });

    // sync data
    this.dataInitialSync = this.getData();
    this.dataSync = this.dataInitialSync;
    this.syncPredicate$ = this.filterSyncFormGroup.get('searchSyncData')!.valueChanges.pipe(
      startWith(CommonConstants.EMPTY_STRING),
      debounceTime(500),
      map(value => ({ value }))
    );
    // async data
    this.dataAsync = this.getData();
    this.dataSubject = new BehaviorSubject(this.dataAsync);
    this.dataAsync$ = this.dataSubject.asObservable();
    this.asyncPredicate$ = this.filterAsyncFormGroup.get('searchAsyncData')!.valueChanges.pipe(
      startWith(CommonConstants.EMPTY_STRING),
      debounceTime(500),
      map(value => ({ value }))
    );

    // Loader
    this.loaderPredicate$ = this.filterLoaderFormGroup.get('searchLoaderData')!.valueChanges.pipe(
      startWith(CommonConstants.EMPTY_STRING),
      debounceTime(500),
      map(value => ({ value }))
    )

    this.loader = this.getLoaderFunction(this.dataSubject.asObservable());

    // columns modification
    this.columnsModification = this.getColumns();
    this.dataColumnModifications = this.getData();
    this.dataColumnModifications.forEach((item: any) => {
      item.newColumn = "new value";
    });

    // cards
    this.columnsCards = this.getColumns();

    // full
    this.columnsFull = this.getColumns();
    this.columnsFull.forEach(column => {
      column.sorting = {
        enabled: true,
        direction: SortingDirection.Descending,
        icons: [{ direction: SortingDirection.Ascending, icon: faCar }, { direction: SortingDirection.Descending, icon: faPen }]
      }
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  public filter(data: any[], parameters: ILoadContainerParameters): any[] {
    return parameters.params.value ? data.filter(y => y.name.toLowerCase().indexOf(parameters.params.value) > -1) : data;
  }

  private getLoaderFunction(data$: Observable<any[]>) {
    return ((parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<any>> => {
      return data$.pipe(
        delay(1000),
        map(items => {
          let filtered = where(items, (item: any) => {
            if (isNullOrEmptyString(parameters.params.value))
              return true;

            return item.name.toLowerCase().indexOf(parameters.params.value) > -1;
          });

          if (parameters.sorting) {
            filtered = sortBy([...filtered!], parameters.sorting.id, parameters.sorting.direction);
          }

          const data: ILoadContainerLoaderResultModel<any> = filtered
            ? {
              items: skip(filtered, parameters.page, 3),
              next: parameters.page < Math.ceil(filtered.length / 3),
              total: filtered.length
            }
            : { items: [], next: false, total: items.length };

          return data;
        })
      );
    });
  }

  // STUBS

  private getColumns(): ITableColumnModel[] {
    return [
      {
        name: 'Id',
        field: 'id'
      },
      {
        name: 'Name',
        field: 'name'
      },
      {
        name: 'Code',
        field: 'code'
      },
      {
        name: 'Date',
        field: 'date'
      },
      {
        name: 'Date1_asdasd',
        field: 'date1'
      },
      {
        name: 'Date2_asdasd',
        field: 'date2'
      }
    ];
  }

  private getData(): any[] {
    return [
      {
        id: 1,
        name: 'name 1',
        code: 111,
        date: new Date()
      },
      {
        id: 2,
        name: 'name 2',
        code: 222,
        date: new Date()
      },
      {
        id: 3,
        name: 'name 3',
        code: 333,
        date: new Date()
      },
      {
        id: 4,
        name: 'name 4',
        code: 444,
        date: new Date()
      },
      {
        id: 5,
        name: 'name 5',
        code: 555,
        date: new Date()
      },
      {
        id: 6,
        name: 'name 6',
        code: 666,
        date: new Date()
      },
      {
        id: 7,
        name: 'name 7',
        code: 777,
        date: new Date()
      },
      {
        id: 8,
        name: 'name 8',
        code: 888,
        date: new Date()
      },
      {
        id: 9,
        name: 'name 9',
        code: 8889,
        date: new Date()
      },
      {
        id: 10,
        name: 'name 10',
        code: 88810,
        date: new Date()
      },
      {
        id: 11,
        name: 'name 11',
        code: 88811,
        date: new Date()
      },
      {
        id: 12,
        name: 'name 12',
        code: 88812,
        date: new Date()
      }
    ];
  }

  // END STUBS

  // SYNC DATA ACTIONS

  addItemSync() {
    const newItem = { id: 13, name: 'new one', code: 8889, date: new Date() };
    this.dataSync.push(newItem);
  }

  removeItemSync() {
    this.dataSync.shift();
  }

  // END SYNC DATA ACTIONS

  // ASYNC DATA ACTIONS

  addItemAsync() {
    this.dataAsync.push({ id: 13, name: 'new one', code: 8889, date: new Date() });
    this.dataSubject.next(this.dataAsync);
  }

  removeItemAsync() {
    this.dataAsync.splice(-1);
    this.dataSubject.next(this.dataAsync);
  }

  // END ASYNC DATA ACTIONS

  // COLUMNS MODIFICATION

  addColumn() {
    this.columnsModification.push({
      name: 'New column',
      field: 'newColumn',
      icon: faStar,
      sorting: {
        enabled: true,
        direction: SortingDirection.Descending,
        icons: [{ icon: faStar, direction: SortingDirection.Descending }, { icon: faCar, direction: SortingDirection.Ascending }]
      }
    });
  }

  removeColumn() {
    this.columnsModification.splice(-1);
  }

  // END COLUMNS MODIFICATION
}
