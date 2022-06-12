import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { hasItem, isDefined } from '../../utils';
import { IPaginationViewModel } from './models/pagination-view.model';
import { PaginationConstants } from './pagination.constants';
import { IPaginationEvent } from './service/pagination.event';
import { PaginationService } from './service/pagination.service';

@Component({
  selector: 'sfc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  // max limit for pagination bts
  @Input()
  count: number = PaginationConstants.DEFAULT_COUNT;

  /**
  * show full range of data
  */
  @Input()
  full: boolean = false;

  /**
   * show first and last page's btn
   */
  @Input()
  limits: boolean = false;

  @Input()
  data$!: Observable<any[]>;

  public vm$!: Observable<IPaginationViewModel>;

  constructor(private service: PaginationService) { }

  ngOnInit(): void {
    if (!isDefined(this.service.pagination$))
      this.service.init(this.data$);

    if (isDefined(this.service.pagination$)) {
      this.vm$ = this.service.pagination$.pipe(
        map((event) => {
          const range = this.initRange(event);
          return {
            range: range, // range of pagination data
            any: event.total > 0, // if exist range of pages
            firstPage: this.showStartLimit(range, event), // show first page of range
            lastPage: this.showEndLimit(range, event), // show last page of range
            previousPage: event.page != PaginationConstants.DEFAULT_PAGE, // show previous btn
            nextPage: event.total > event.page, // show next btn
            page: event.page,
            previous: event.previous,
            next: event.next,
            total: event.total
          }
        })
      );
    }
  }

  onPageClick(page: number) {
    this.service.page(page);
  }

  private get showLimitPages(): boolean {
    return this.limits && !this.full;
  }

  private showStartLimit(range: number[], event: IPaginationEvent): boolean {
    return this.showLimitPages && event.page !== PaginationConstants.DEFAULT_PAGE
      && !hasItem(range, PaginationConstants.DEFAULT_PAGE);
  }

  private showEndLimit(range: number[], event: IPaginationEvent): boolean {
    return this.showLimitPages && event.total !== event.page && !hasItem(range, event.total);
  }

  private initRange(event: IPaginationEvent): number[] {
    let start = 1,
      end = event.total + 1;

    if (!this.full) {
      const fullRange = this.range(1, event.total + 1),
        pageIndex = fullRange.indexOf(event.page),
        pageCount = Math.min(event.total, this.count);

      let rangeStart = 0, rangeEnd = 0;

      if (pageCount == PaginationConstants.DEFAULT_PAGE) {
        rangeStart = rangeEnd = pageIndex;
      } else {
        let allowedCount = pageCount - 1,
          partValue = Math.ceil(allowedCount / 2),
          leftValue = pageIndex - partValue < 0 ? pageIndex : partValue,
          rightToExtend = allowedCount - leftValue,
          rightValue = rightToExtend < 0 ? 0 : rightToExtend;

        if (pageIndex + rightValue >= event.total)
          leftValue += pageIndex + rightValue - event.total + 1;

        rangeStart = pageIndex - leftValue;
        rangeEnd = pageIndex + rightValue;
      }

      start = rangeStart + 1;
      end = Math.min(event.total + 1, rangeEnd + 2);
    }

    return this.range(start, end);
  }

  private range(start: number, stop: number, step: number = 1): number[] {
    if (!stop) { start = 0; stop = start; }
    return Array.from(new Array(Number((stop - start) / step)), (_, i) => start + i * step);
  }
}
