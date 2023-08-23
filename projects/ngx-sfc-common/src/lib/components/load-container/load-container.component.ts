import { Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { map, tap, switchMap, startWith, EMPTY, Subscription, of, Observable, combineLatest } from 'rxjs';
import { ComponentSize, Position, UIClass } from '../../enums';
import { ILoadMoreModel } from './models/load-more.model';
import { any, isDefined, skip } from '../../utils';
import { LoaderService } from '../loader/service/loader.service';
import { LoadMoreService } from './service/load-more.service';
import { ILoadMoreParameters } from './models/load-more-parameters.model';
import { ILoadContainerModel, LoaderFunction } from './models/load-container.model';
import { LoadChangesSource, LoadContainerType } from './load-container.enum';
import { LoadContainerConstants } from './load-container.constants';
import { ILoadMorePredicateParameters } from './models/load-more-predicate-parameters.model';

@Component({
  selector: 'sfc-load-container',
  templateUrl: './load-container.component.html',
  styleUrls: ['./load-container.component.scss'],
  providers: [LoadMoreService]
})
export class LoadContainerComponent implements OnDestroy {

  ComponentSize = ComponentSize;
  Position = Position;

  @Input()
  id!: string;

  @Input()
  @HostBinding('class')
  type: LoadContainerType = LoadContainerType.Dropdown;

  @Input()
  @HostBinding(`class.${UIClass.Open}`)
  open: boolean = false;

  @Input()
  loadMore: boolean = true;

  @Input()
  showEmpty: boolean = true;

  @Input()
  showLoadMoreButton: boolean = true;

  @Input()
  loadMoreLabel!: string;

  @Input()
  notFoundLabel: string = LoadContainerConstants.DEFAULT_NOT_FOUND_LABEL;

  @Input()
  set model(model: ILoadContainerModel) {
    if (isDefined(model)) {
      const parameters$ = this.buildParameters(model.predicate$),
        data$: Observable<ILoadMoreModel<any>> = isDefined(model.loader) ?
          this.buildDynamic(parameters$, model.loader as LoaderFunction) : this.buildStatic(parameters$, model);

      if (isDefined(this._subscription))
        this._subscription.unsubscribe();

      this._subscription = data$.subscribe(
        {
          next: (result: ILoadMoreModel<any>) => this.success(result),
          error: (error) => this.error(error)
        }
      );
    }
  }

  @Input()
  scrollTarget!: HTMLElement;

  @Output()
  handleError: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  handleSuccess: EventEmitter<ILoadMoreModel<any>> = new EventEmitter<ILoadMoreModel<any>>();

  @Output()
  handleLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('content')
  private contentEl!: ElementRef;

  public next: boolean = false;

  public get scrollPosition(): Position[] {
    return !this.allowLoadMore || this.showLoadMoreButton ? [] : [Position.Bottom];
  }

  public get allowLoadMore(): boolean { return this.next && this.loadMore; }

  public get hideLoadMoreButton(): boolean { return !(this.allowLoadMore && this.showLoadMoreButton); }

  public empty: boolean = false;

  @HostBinding(`class.${UIClass.Empty}`)
  public get isEmpty(): boolean { return this.empty && this.showEmpty; }

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

  private _subscription!: Subscription;

  // define what source emit changes for data (1. data changes, 2. predicate conditions)
  private source: LoadChangesSource = LoadChangesSource.Data;

  constructor(private loaderService: LoaderService, private loadMoreService: LoadMoreService) { }

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

  private success(result: ILoadMoreModel<any>): void {
    this.next = result.next;
    this.loading = false;
    this.empty = !any(result.items);
    this.handleSuccess.emit(result);
  }

  private error(error: any): void {
    this.loading = false;
    this.empty = false;
    this.handleError.emit(error);
  }

  private buildParameters(predicate$: Observable<ILoadMorePredicateParameters | null> | undefined)
    : Observable<ILoadMoreParameters> {
    const parameters$ = (predicate$ || EMPTY.pipe(startWith(null))).pipe(
      tap((predicateParameters: ILoadMorePredicateParameters | null) => {
        if (predicateParameters)
          this.resetParameters();
      }),
      switchMap((value: any) => {
        return this.loadMoreService.more$.pipe(
          startWith(LoadMoreService.START_PAGE),
          tap(() => {
            this.source = LoadChangesSource.Parameters;
            this.loading = true;
          }),
          map((page: number) => {
            return { params: value, page: page }
          })
        )
      })
    );

    return parameters$;
  }

  private buildDynamic(parameters$: Observable<ILoadMoreParameters>, loader: LoaderFunction)
    : Observable<ILoadMoreModel<any>> {
    return parameters$.pipe(
      switchMap((parameters: ILoadMoreParameters) => loader(parameters, this.source).pipe(
        tap((model: ILoadMoreModel<any>) => {
          if (model.reset) {
            this.source = LoadChangesSource.Data;
            this.resetParameters();
          }
        })
      ))
    );
  }

  private buildStatic(parameters$: Observable<ILoadMoreParameters>, model: ILoadContainerModel)
    : Observable<ILoadMoreModel<any>> {
    const data$ = (model.data$ || of([])).pipe(
      tap(_ => this.source = LoadChangesSource.Data));

    return combineLatest([parameters$, data$]).pipe(
      map(([parameters, items]) => {
        const reset: boolean = this.source == LoadChangesSource.Data;

        if (reset && parameters.page != LoadMoreService.START_PAGE) {
          // if data changed need to start from start
          this.resetParameters();
          parameters = { params: parameters.params, page: 1 };
        }

        const filtered = model.filter ? model.filter(items, parameters) : items,
          size = model.size || LoadContainerConstants.DEFAULT_PAGE_SIZE,
          data: ILoadMoreModel<any> = filtered ? {
            items: skip(filtered, parameters.page, size),
            next: parameters.page < Math.ceil(filtered.length / size),
            reset
          } : { items: [], next: false, reset };
        return data;
      }));
  }

  private resetParameters(): void {
    if (isDefined(this.contentEl))
      this.contentEl.nativeElement.scrollTop = 0;

    this.loadMoreService.reset();
  }
}