import { Directive, OnInit } from '@angular/core';
import { ILoadMoreModel, ILoadMoreParameters, LoadChangesSource, LoaderFunction, skip } from 'ngx-sfc-common';
import { SelectItemModel } from 'ngx-sfc-inputs';
import { of, BehaviorSubject, Observable, delay, map } from 'rxjs';
import { BasePresentationComponent } from '../base-presentations.component';

@Directive()
export abstract class BaseSelectPresentationComponent extends BasePresentationComponent
  implements OnInit {

  public data: SelectItemModel[] = [
    {
      key: 1,
      value: 'andrii 1',
      image: '../assets/argentina_messi.png'
    },
    {
      key: 3,
      value: "anita 3"
    },
    {
      key: 4,
      value: "anton 4",
      image: '../assets/costa_rica_ruis.png'
    },
    {
      key: 5,
      value: "noa 5"
    },
    {
      key: 6,
      value: "nina 6"
    },
    {
      key: 7,
      value: "nikita 7"
    },
    {
      key: 8,
      value: "nazar 8"
    },
    {
      key: 9,
      value: "leo 9"
    },
    {
      key: 10,
      value: "apa 10"
    },
    {
      key: 11,
      value: "vova 11"
    }
  ];

  public dataModification: SelectItemModel[] = [
    {
      key: 1,
      value: 'abc 1'
    },
    {
      key: 2,
      value: 'abc 2'
    },
    {
      key: 3,
      value: 'abc 3'
    },
    {
      key: 4,
      value: 'abc 4'
    },
    {
      key: 5,
      value: 'abc 5'
    },
    {
      key: 6,
      value: 'abc 6'
    },
    {
      key: 7,
      value: 'abc 7'
    },
    {
      key: 8,
      value: 'abc 8'
    },
    {
      key: 9,
      value: 'abc 9'
    },
    {
      key: 10,
      value: 'abc 10'
    },
    {
      key: 11,
      value: 'abc 11'
    },
    {
      key: 12,
      value: 'abc 12'
    }
  ];

  public data$ = of(this.data);

  private dataModificationAsync: SelectItemModel[] = Array.from(this.dataModification);
  private dataSubject = new BehaviorSubject(this.dataModificationAsync);
  public dataModification$: Observable<SelectItemModel[]> = this.dataSubject.asObservable();

  public loader!: LoaderFunction;
  private loaderData$ = of(this.data);

  public loaderModification!: LoaderFunction;
  private dataModificationLoader: SelectItemModel[] = Array.from(this.dataModification);
  private dataLoaderSubject = new BehaviorSubject(this.dataModificationLoader);
  private loaderDataModification$: Observable<SelectItemModel[]> = this.dataLoaderSubject.asObservable();

  ngOnInit(): void {
    this.loader = this.getLoaderFunction(this.loaderData$);
    this.loaderModification = this.getLoaderFunction(this.loaderDataModification$);
  }

  // SYNC DATA ACTIONS

  addItemSync() {
    this.dataModification.push({
      key: 13,
      value: 'abc 13'
    });
  }

  removeItemSync() {
    this.dataModification.shift();
  }

  // END SYNC DATA ACTIONS

  // ASYNC DATA ACTIONS

  addItemAsync() {
    this.dataModificationAsync.push({
      key: 13,
      value: 'abc 13'
    });
    this.dataSubject.next(this.dataModificationAsync);
  }

  removeItemAsync() {
    this.dataModificationAsync.splice(-1);
    this.dataSubject.next(this.dataModificationAsync);
  }

  // END ASYNC DATA ACTIONS

  // LOADER DATA ACTIONS

  addItemLoader() {
    this.dataModificationLoader.push({
      key: 13,
      value: 'abc 13'
    });
    this.dataLoaderSubject.next(this.dataModificationLoader);
  }

  removeItemLoader() {
    this.dataModificationLoader.splice(-1);
    this.dataLoaderSubject.next(this.dataModificationLoader);
  }

  // END LOADER DATA ACTIONS

  private getLoaderFunction(data$: Observable<SelectItemModel[]>) {
    return ((parameters: ILoadMoreParameters, source: LoadChangesSource): Observable<ILoadMoreModel<any>> => {
      return data$.pipe(
        delay(1000),
        map(items => {
          const reset = source == LoadChangesSource.Data;

          if (reset) {
            parameters = { params: parameters.params, page: 1 };
          }

          const data: ILoadMoreModel<any> = items
            ? {
              items: skip(items, parameters.page, 3),
              next: parameters.page < Math.ceil(items.length / 3),
              reset: reset
            }
            : { items: [], next: false, reset: reset };

          source = LoadChangesSource.Data;

          return data;
        })
      );
    });
  }
}
