import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CommonConstants, Position } from 'ngx-sfc-common';
import { ComponentSize, SortingDirection } from 'ngx-sfc-common';
import { IDefaultTableColumnModel, ITableDataModel, ITablePaginationModel, TableDataType } from 'ngx-sfc-components';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, startWith, tap } from 'rxjs';
import { faCar, faPen, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './tables-default-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss'],
  styles: ['.component-column{ display: initial !important; text-align: center;}']
})
export class TablesDefaultPresentationComponent {

  ComponentSize = ComponentSize;
  Position = Position;
  TableDataType = TableDataType;

  // columns
  columnsDefault: IDefaultTableColumnModel[] = [];
  columnsSorting: IDefaultTableColumnModel[] = [];
  columnsSelectable: IDefaultTableColumnModel[] = [];
  columnsModification: IDefaultTableColumnModel[] = [];

  // data
  dataDefault: ITableDataModel[] = [];
  dataSync: ITableDataModel[] = [];
  dataAsync: ITableDataModel[] = [];
  dataColumnModifications: ITableDataModel[] = [];
  filteredData$!: Observable<ITableDataModel[]>;
  dataSubject!: BehaviorSubject<ITableDataModel[]>;

  paginationConfig: ITablePaginationModel = { enabled: true, page: 2, size: 2 };

  // forms
  filterSyncFormGroup: UntypedFormGroup = new UntypedFormGroup({
    searchSyncData: new UntypedFormControl()
  });

  filterAsyncFormGroup: UntypedFormGroup = new UntypedFormGroup({
    searchAsyncData: new UntypedFormControl()
  });

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
        icons: [{ direction: SortingDirection.Ascending, icon: faCar }, { direction: SortingDirection.Descending, icon: faPen }]
      }
    });

    // selectable
    this.columnsSelectable = this.getColumns();
    this.columnsSelectable.forEach((column, index) => {
      if (index % 2 == 0)
        column.icon = faCar;
    });

    // sync data
    const dataInitialSync = this.getData();
    dataInitialSync.forEach((data, index) => {
      if (index % 2 == 0)
        data.selected = true;
    });
    this.filterSyncFormGroup.get('searchSyncData')?.valueChanges.pipe(
      startWith(''),
      debounceTime(500)
    ).pipe(
      tap(input => {
        if (!input)
          this.dataSync = dataInitialSync;
        else
          this.dataSync = dataInitialSync.filter(y => y.data.name.toLowerCase().indexOf(input) > -1);
      })
    ).subscribe();

    // async data
    this.dataAsync = this.getData();
    this.dataSubject = new BehaviorSubject(this.dataAsync);
    this.filteredData$ = combineLatest([
      this.dataSubject.asObservable(),
      this.filterAsyncFormGroup.get('searchAsyncData')?.valueChanges.pipe(
        startWith(CommonConstants.EMPTY_STRING),
        debounceTime(500)
      ) as Observable<string>]
    ).pipe(
      map(([data, input]) => {
        return data.filter(y => y.data.name.toLowerCase().indexOf(input) > -1);
      })
    );

    // columns modification
    this.columnsModification = this.getColumns();
    this.dataColumnModifications = this.getData();
    this.dataColumnModifications.forEach((item: ITableDataModel) => {
      item.data.newColumn = "new value";
    });
  }

  // STUBS

  private getColumns(): IDefaultTableColumnModel[] {
    return [
      {
        name: 'Id',
        field: 'id',
        icon: undefined
      },
      {
        name: 'Name',
        field: 'name',
        icon: undefined
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

  private getData(): ITableDataModel[] {
    return [
      {
        data: {
          id: 1,
          name: 'name 1',
          code: 111,
          date: new Date()
        },
        selected: false
      },
      {
        data: {
          id: 2,
          name: 'name 2',
          code: 222,
          date: new Date()
        },
        selected: false
      },
      {
        data: {
          id: 3,
          name: 'name 3',
          code: 333,
          date: new Date()
        },
        selected: false
      },
      {
        data: {
          id: 4,
          name: 'name 4',
          code: 444,
          date: new Date()
        },
        selected: false
      },
      {
        data: {
          id: 5,
          name: 'name 5',
          code: 555,
          date: new Date()
        },
        selected: false
      },
      {
        data: {
          id: 6,
          name: 'name 6',
          code: 666,
          date: new Date()
        },
        selected: false
      },
      {
        data: {
          id: 7,
          name: 'name 7',
          code: 777,
          date: new Date()
        },
        selected: false
      },
      {
        data: {
          id: 8,
          name: 'name 8',
          code: 888,
          date: new Date()
        },
        selected: false
      },
      {
        data: {
          id: 9,
          name: 'name 9',
          code: 8889,
          date: new Date()
        },
        selected: false
      },
      {
        data: {
          id: 10,
          name: 'name 10',
          code: 88810,
          date: new Date()
        },
        selected: false
      },
      {
        data: {
          id: 11,
          name: 'name 11',
          code: 88811,
          date: new Date()
        },
        selected: false
      },
      {
        data: {
          id: 12,
          name: 'name 12',
          code: 88812,
          date: new Date()
        },
        selected: false
      }
    ];
  }

  // END STUBS

  // SYNC DATA ACTIONS

  addItemSync() {
    this.dataSync.push({ data: { id: 13, name: 'new one', code: 8889, date: new Date() } });
  }

  removeItemSync() {
    this.dataSync.shift();
  }

  // END SYNC DATA ACTIONS

  // ASYNC DATA ACTIONS

  addItemAsync() {
    this.dataAsync.push({ data: { id: 13, name: 'new one', code: 8889, date: new Date() } });
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
