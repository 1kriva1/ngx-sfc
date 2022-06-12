import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, startWith, Subject } from 'rxjs';
import { isDefined } from '../../../utils';
import { PaginationConstants } from '../pagination.constants';
import { IPaginationEvent } from './pagination.event';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  /**
   * Handle page changing
   */
  private pageSubject = new Subject<number>();
  private page$ = this.pageSubject.asObservable();

  /** Total items */
  public total$!: Observable<number>;

  /** Total pages */
  public totalPages$!: Observable<number>;

  /** Pagination  event data */
  public pagination$!: Observable<IPaginationEvent>;

  /** Need for init pagination observables */
  public init(
    data$: Observable<any[]>,
    page: number = PaginationConstants.DEFAULT_PAGE,
    pageSize: number = PaginationConstants.DEFAULT_SIZE) {

    if (isDefined(data$))
      this.initObservables(data$, page, pageSize);
  }

  /**
   * Move to page
   */
  public page(page: number) {
    this.pageSubject.next(page);
  }

  private initObservables(data$: Observable<any[]>, page: number, pageSize: number) {
    this.total$ = data$.pipe(map((p: any[]) => p.length));

    this.totalPages$ = this.total$.pipe(map((total: number) => Math.ceil(total / pageSize)));

    this.pagination$ = combineLatest([this.totalPages$, this.page$.pipe(startWith(page))])
      .pipe(
        map(([total, page]) => {
          return {
            page: page > total ? PaginationConstants.DEFAULT_PAGE : page,
            next: Math.min(page + 1, total),
            previous: Math.max(1, page - 1),
            total: total
          };
        })
      )
  }
}
