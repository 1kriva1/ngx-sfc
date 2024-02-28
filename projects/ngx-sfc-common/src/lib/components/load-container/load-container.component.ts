import { Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { map, tap, switchMap, startWith, EMPTY, Subscription, of, Observable, combineLatest } from 'rxjs';
import { ComponentSize, Position, UIClass } from '../../enums';
import { ILoadContainerLoaderResultModel, ILoadContainerResultModel } from './models/load-container-result.model';
import { any, isDefined, skip, sortBy } from '../../utils';
import { LoaderService } from '../loader/service/loader.service';
import { ILoadContainerParameters } from './models/load-container-parameters.model';
import { ILoadContainerModel, LoaderFunction } from './models/load-container.model';
import { LoadContainerLoadType } from './enums/load-container-load-type.enum';
import { LoadContainerConstants } from './load-container.constants';
import { ILoadContainerPredicateParameters } from './models/load-container-predicate-parameters.model';
import { LoadMoreService, PaginationService, SortingService } from '../../services';
import { LoadContainerChangesSource } from './enums/load-container-changes-source.enum';
import { LoadContainerType } from './enums/load-container-type.enum';
import { PaginationConstants } from '../pagination/pagination.constants';
import { empty } from '../../types';

@Component({
  selector: 'sfc-load-container',
  templateUrl: './load-container.component.html',
  styleUrls: ['./load-container.component.scss'],
  providers: [LoadMoreService, PaginationService]
})
export class LoadContainerComponent implements OnDestroy {

  ComponentSize = ComponentSize;
  Position = Position;

  // loader identificator
  @Input()
  id!: string;

  @Input()
  @HostBinding('class')
  type: LoadContainerType = LoadContainerType.Dropdown;

  @Input()
  @HostBinding(`class.${UIClass.Open}`)
  open: boolean = false;

  // outer flag to allow load more or not
  @Input()
  loadMore: boolean = true;

  @Input()
  loadMoreLabel: string = LoadContainerConstants.DEFAULT_SHOW_MORE_LABEL;

  @Input()
  showEmpty: boolean = true;

  @Input()
  emptyLabel: string = LoadContainerConstants.DEFAULT_EMPTY_LABEL;

  @Input()
  set model(value: ILoadContainerModel) {
    this._model = value;
    this.subscribe();
  }
  get model(): ILoadContainerModel {
    return this._model;
  }
  _model!: ILoadContainerModel;

  @Input()
  scrollTarget!: HTMLElement;

  @Input()
  paginationCount: number = PaginationConstants.DEFAULT_COUNT;

  @Input()
  paginationLimits: boolean = false;

  @Input()
  showLoading: boolean = true;

  @Output()
  handleError: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  handleSuccess: EventEmitter<ILoadContainerResultModel<any>> = new EventEmitter<ILoadContainerResultModel<any>>();

  @Output()
  handleLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('content')
  private contentEl!: ElementRef;

  public get scrollPosition(): Position[] {
    return !this.allowLoadMore || this.showLoadMoreButton ? [] : [Position.Bottom];
  }

  public get allowLoadMore(): boolean { return this.next && this.loadMore; }

  public get hideLoadMoreButton(): boolean { return !(this.allowLoadMore && this.showLoadMoreButton); }

  public next: boolean = false;

  public empty: boolean = false;

  public total: number = LoadContainerConstants.DEFAULT_TOTAL;

  @HostBinding(`class.${UIClass.Empty}`)
  public get isEmpty(): boolean { return this.empty && this.showEmpty; }

  public get page(): number { return this.pagination ? this.paginationService.pageValue : this.loadMoreService.pageValue; }

  public get showPagination(): boolean { return Boolean(this.total) && !this.empty && this.pagination; }

  @HostBinding(`class.${UIClass.Loading}`)
  private _loading: boolean = false;
  private set loading(value: boolean) {
    this._loading = value;
    if (value)
      this.loaderService.show(this.id, true);
    else
      this.loaderService.hide(this.id);

    this.handleLoading.emit(value);
  }

  private get showLoadMoreButton(): boolean {
    return this.model.loadType == LoadContainerLoadType.Button;
  }

  private get reset(): boolean {
    return this.source == LoadContainerChangesSource.Predicate ||
      this.source == LoadContainerChangesSource.Page ||
      this.source == LoadContainerChangesSource.Data;
  }

  private get pagination(): boolean { return this.model.loadType == LoadContainerLoadType.Pagination; }

  private _subscription!: Subscription;

  // define what source emit changes for data
  private source: LoadContainerChangesSource = LoadContainerChangesSource.Initial;

  private predicateChanged: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private loadMoreService: LoadMoreService,
    private paginationService: PaginationService,
    private sortingService: SortingService) { }

  ngOnDestroy(): void {
    if (this._subscription)
      this._subscription.unsubscribe();
  }

  public more(event: MouseEvent): void {
    event.preventDefault();
    this.loadMoreService.more();
  }

  public onScroll(): void {
    if (this.allowLoadMore)
      this.loadMoreService.more();
  }

  private success(result: ILoadContainerResultModel<any>): void {
    this.next = result.next;
    this.loading = false;
    this.empty = !any(result.items);
    this.total = result.total!;
    this.loadMore = true;
    this.handleSuccess.emit(result);
  }

  private error(error: any): void {
    this.loading = false;
    this.empty = false;
    this.total = 0;
    this.handleError.emit(error);
  }

  private subscribe(): void {
    if (!this.model) return;

    if (!isDefined(this.model.pagination))
      this.model.pagination = PaginationConstants.DEFAULT_PAGINATION;
    else
      this.paginationService.pageValue = this.model.pagination?.page!;

    const parameters$ = this.buildParameters(this.model.predicate$),
      data$: Observable<ILoadContainerResultModel<any>> = isDefined(this.model.loader)
        ? this.buildDynamic(parameters$, this.model.loader as LoaderFunction)
        : this.buildStatic(parameters$, this.model);

    if (isDefined(this._subscription))
      this._subscription.unsubscribe();

    this._subscription = data$.subscribe(
      {
        next: (result: ILoadContainerResultModel<any>) => this.success(result),
        error: (error) => this.error(error)
      }
    );
  }

  private buildParameters(predicate$: Observable<ILoadContainerPredicateParameters | null> | empty)
    : Observable<ILoadContainerParameters> {
    const parameters$ = (predicate$ || EMPTY.pipe(startWith(null))).pipe(
      tap(() => {
        if (this.source != LoadContainerChangesSource.Initial)
          this.resetParameters();

        this.source = LoadContainerChangesSource.Predicate;
        this.predicateChanged = true;
      }),
      switchMap((params) => {
        const more$ = this.loadMoreService.more$.pipe(
          startWith(PaginationConstants.DEFAULT_PAGE),
          tap(() => {
            if (!this.predicateChanged)
              this.source = LoadContainerChangesSource.More;

            this.loadMore = false;
            this.predicateChanged = false;
          })
        ),
          pagination$ = this.paginationService.page$.pipe(
            startWith(this.model.pagination?.page || PaginationConstants.DEFAULT_PAGE),
            tap(() => {
              if (!this.predicateChanged)
                this.source = LoadContainerChangesSource.Page;

              this.predicateChanged = false;
            })
          ),
          loader$ = this.pagination ? pagination$ : more$;

        return loader$.pipe(
          map(() => ({ params: params!, page: this.page }))
        );
      })
    );

    return combineLatest([this.sortingService.sorting$.pipe(startWith(this.model.sorting)), parameters$]).pipe(
      tap(() => this.loading = true),
      map(([sorting, parameters]) => ({ params: parameters.params!, page: parameters.page, sorting: sorting }))
    );
  }

  private buildDynamic(parameters$: Observable<ILoadContainerParameters>, loader: LoaderFunction)
    : Observable<ILoadContainerResultModel<any>> {
    return parameters$.pipe(
      switchMap((parameters: ILoadContainerParameters) => loader(parameters)),
      map((model: ILoadContainerLoaderResultModel<any>) => ({ ...model, reset: this.reset, page: this.page }))
    );
  }

  private buildStatic(parameters$: Observable<ILoadContainerParameters>, model: ILoadContainerModel)
    : Observable<ILoadContainerResultModel<any>> {
    const data$ = (model.data$ || of([])).pipe(
      map((data, index) => ({ data, index })),
      tap(model => this.source = model.index ? LoadContainerChangesSource.Data : this.source),
      map(model => model.data)
    );

    return combineLatest([parameters$, data$]).pipe(
      map(([parameters, items]) => {
        // if data changed need to start from start (pagination)
        if (this.source == LoadContainerChangesSource.Data
          && parameters.page != LoadMoreService.START_PAGE) {
          this.resetParameters();
          parameters = { params: parameters.params, page: this.page, sorting: parameters.sorting };
        }

        const filtered = model.filter ? model.filter(items, parameters) : items,
          sorted = parameters.sorting ? sortBy([...filtered], parameters.sorting.id, parameters.sorting.direction) : filtered,
          data: ILoadContainerResultModel<any> = sorted ? {
            items: skip(sorted, parameters.page, this.model.pagination?.size!),
            next: parameters.page < Math.ceil(sorted.length / this.model.pagination?.size!),
            reset: this.reset,
            total: sorted.length,
            page: parameters.page
          } : { items: [], next: false, reset: this.reset, total: items.length, page: parameters.page };

        return data;
      }));
  }

  private resetParameters(): void {
    if (isDefined(this.contentEl))
      this.contentEl.nativeElement.scrollTop = 0;

    if (this.pagination)
      this.paginationService.reset();
    else
      this.loadMoreService.reset();
  }
}