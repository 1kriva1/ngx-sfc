import { Component, Input } from '@angular/core';
import { hasItem } from '../../utils';
import { IPaginationViewModel } from './pagination-view.model';
import { PaginationConstants } from './pagination.constants';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PaginationService } from '../../services';

@Component({
  selector: 'sfc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

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
  page: number = PaginationConstants.DEFAULT_PAGE;

  @Input()
  total: number = PaginationConstants.DEFAULT_TOTAL;

  /**
   * Page size
   */
  @Input()
  size: number = PaginationConstants.DEFAULT_SIZE;

  get model(): IPaginationViewModel {
    const totalPages = Math.ceil(this.total / this.size),
      page = this.page > totalPages ? PaginationConstants.DEFAULT_PAGE : this.page,
      next = Math.min(this.page + 1, totalPages),
      previous = Math.max(1, this.page - 1),
      range = this.initRange(totalPages, page);

    return {
      range: range, // range of pagination data
      any: totalPages > 0, // if exist range of pages
      firstPage: this.showStartLimit(range, page), // show first page of range
      lastPage: this.showEndLimit(range, totalPages, page), // show last page of range
      previousPage: page != PaginationConstants.DEFAULT_PAGE, // show previous btn
      nextPage: totalPages > page, // show next btn
      page: page,
      previous: previous,
      next: next,
      total: totalPages
    }
  }

  constructor(private service: PaginationService) { }

  onPageClick(page: number) { this.service.page(page); }

  private get showLimitPages(): boolean {
    return this.limits && !this.full;
  }

  private showStartLimit(range: number[], page: number): boolean {
    return this.showLimitPages && page !== PaginationConstants.DEFAULT_PAGE
      && !hasItem(range, PaginationConstants.DEFAULT_PAGE);
  }

  private showEndLimit(range: number[], total: number, page: number): boolean {
    return this.showLimitPages && total !== page && !hasItem(range, total);
  }

  private initRange(total: number, page: number): number[] {
    let start = 1,
      end = total + 1;

    if (!this.full) {
      const fullRange = this.range(1, total + 1),
        pageIndex = fullRange.indexOf(page),
        pageCount = Math.min(total, this.count);

      let rangeStart = 0, rangeEnd = 0;

      if (pageCount == PaginationConstants.DEFAULT_PAGE) {
        rangeStart = rangeEnd = pageIndex;
      } else {
        let allowedCount = pageCount - 1,
          partValue = Math.ceil(allowedCount / 2),
          leftValue = pageIndex - partValue < 0 ? pageIndex : partValue,
          rightToExtend = allowedCount - leftValue,
          rightValue = rightToExtend < 0 ? 0 : rightToExtend;

        if (pageIndex + rightValue >= total)
          leftValue += pageIndex + rightValue - total + 1;

        rangeStart = pageIndex - leftValue;
        rangeEnd = pageIndex + rightValue;
      }

      start = rangeStart + 1;
      end = Math.min(total + 1, rangeEnd + 2);
    }

    return this.range(start, end);
  }

  private range(start: number, stop: number, step: number = 1): number[] {
    if (!stop) { start = 0; stop = start; }
    return Array.from(new Array(Number((stop - start) / step)), (_, i) => start + i * step);
  }
}
