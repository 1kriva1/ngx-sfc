import { Component } from '@angular/core';
import { ComponentSize, distinct, ILoadContainerModel, ILoadContainerResultModel, ILoadContainerParameters, LoadContainerLoadType, LoadContainerType, LoaderFunction, skip, ILoadContainerLoaderResultModel } from 'ngx-sfc-common';
import { of, Subject, Observable, startWith, delay, map } from 'rxjs';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './load-container-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss', './load-container-presentation.component.scss']
})
export class LoadContainerPresentationComponent
  extends BasePresentationComponent {

  ComponentSize = ComponentSize;
  LoadContainerType = LoadContainerType;

  private resetSubject = new Subject();
  private resetData$: Observable<any> = this.resetSubject.asObservable().pipe(startWith({ value: true }));

  private resetLoaderSubject = new Subject();
  private resetLoaderData$: Observable<any> = this.resetLoaderSubject.asObservable().pipe(startWith(null));

  private loadDropdownSubject = new Subject();
  private loadDropdownData$: Observable<any> = this.loadDropdownSubject.asObservable();

  modelReset: ILoadContainerModel = {
    predicate$: this.resetData$,
    data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    loadType: LoadContainerLoadType.Button
  };

  model: ILoadContainerModel = {
    data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    pagination: { size: 2, page: 1 },
    loadType: LoadContainerLoadType.Button
  };

  modelScroll: ILoadContainerModel = {
    data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    loadType: LoadContainerLoadType.Scroll
  };

  modelSize: ILoadContainerModel = {
    data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    loadType: LoadContainerLoadType.Button
  };

  modelDropdown: ILoadContainerModel = {
    predicate$: this.loadDropdownData$,
    data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    loadType: LoadContainerLoadType.Button
  };

  modelEmpty: ILoadContainerModel = {
    data$: of([]),
    loadType: LoadContainerLoadType.Button
  };

  modelFilter: ILoadContainerModel = {
    data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    filter: (data: number[]) => {
      return data.filter(i => i % 2);
    },
    loadType: LoadContainerLoadType.Button
  };

  modelLoader: ILoadContainerModel = {
    loader: this.getLoader(3),
    loadType: LoadContainerLoadType.Button
  };

  modelLoaderPagination: ILoadContainerModel = {
    loader: this.getLoader(5),
    loadType: LoadContainerLoadType.Pagination
  };

  modelLoaderScroll: ILoadContainerModel = {
    loader: this.getLoader(5),
    loadType: LoadContainerLoadType.Scroll
  };

  modelLoaderReset: ILoadContainerModel = {
    predicate$: this.resetLoaderData$,
    loader: this.getLoader(5),
    loadType: LoadContainerLoadType.Button
  };

  items: number[] = [];
  itemsSize: number[] = [];
  itemsLabel: number[] = [];
  itemsDropdown: number[] = [];
  itemsEmpty: number[] = [];
  itemsScroll: number[] = [];
  itemsFilter: number[] = [];
  itemsLoader: number[] = [];
  itemsLoaderPagination: number[] = [];
  itemsLoaderScroll: number[] = [];
  itemsLoaderReset: number[] = [];
  itemsSmall: number[] = [];
  itemsLarge: number[] = [];
  itemsCustom: number[] = [];
  isOpen: boolean = false;

  public reset(): void {
    this.resetSubject.next(null);
  }

  public resetLoader(): void {
    this.resetLoaderSubject.next(null);
  }

  public open(): void {
    this.isOpen = !this.isOpen;
    this.itemsDropdown = [];
    this.loadDropdownSubject.next(null);
  }

  public handleSuccess(result: ILoadContainerResultModel<any>): void {
    if (result.reset)
      this.items = result.items
    else
      this.items = distinct(this.items.concat(result.items));
  }

  public handleLoaderSuccess(result: ILoadContainerResultModel<any>): void {
    if (result.reset)
      this.itemsLoaderReset = result.items
    else
      this.itemsLoaderReset = distinct(this.itemsLoaderReset.concat(result.items));
  }

  private getLoader(pageSize: number): LoaderFunction {
    return ((parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<any>> => {
      return of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).pipe(
        delay(1000),
        map((items: any) => {
          const data: ILoadContainerLoaderResultModel<any> = items
            ? {
              items: skip(items, parameters.page, pageSize),
              next: parameters.page < Math.ceil(items.length / pageSize),
              total: items.length
            }
            : { items: [], next: false, total: items.length };

          return data;
        })
      );
    })
  }
}
