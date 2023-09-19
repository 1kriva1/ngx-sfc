import { Component } from '@angular/core';
import { ComponentSize, distinct, ILoadContainerModel, ILoadMoreModel, LoadContainerType } from 'ngx-sfc-common';
import { of, Subject, Observable, startWith } from 'rxjs';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './load-container-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss', './load-container-presentation.component.scss']
})
export class LoadContainerPresentationComponent
  extends BasePresentationComponent {

  ComponentSize = ComponentSize;
  LoadContainerType = LoadContainerType;

  private loadSubject = new Subject();
  private loadData$: Observable<any> = this.loadSubject.asObservable().pipe(startWith(null));

  private loadDropdownSubject = new Subject();
  private loadDropdownData$: Observable<any> = this.loadDropdownSubject.asObservable();

  modelReset: ILoadContainerModel = {
    predicate$: this.loadData$,
    data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
  };

  model: ILoadContainerModel = {
    data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
  };

  modelSize: ILoadContainerModel = {
    size: 2,
    data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
  };

  modelDropdown: ILoadContainerModel = {
    predicate$: this.loadDropdownData$,
    data$: of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
  };

  modelEmpty: ILoadContainerModel = {
    data$: of([])
  };

  items: number[] = [];
  itemsSize: number[] = [];
  itemsLabel: number[] = [];
  itemsDropdown: number[] = [];
  itemsEmpty: number[] = [];
  itemsScroll: number[] = [];
  itemsSmall: number[] = [];
  itemsLarge: number[] = [];
  itemsCustom: number[] = [];
  isNew: boolean = true;
  isOpen: boolean = false;

  public load(): void {
    this.isNew = true;
    this.loadSubject.next(null);
  }

  public open(): void {
    this.isOpen = true;
    this.itemsDropdown = [];
    this.loadDropdownSubject.next(null);
  }

  public handleSuccess(result: ILoadMoreModel<any>): void {
    if (this.isNew)
      this.items = result.items
    else
      this.items = distinct(this.items.concat(result.items));
    this.isNew = false;
  }
}
