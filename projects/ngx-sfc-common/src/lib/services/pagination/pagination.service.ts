import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public static readonly START_PAGE: number = 1;

  public pageValue = PaginationService.START_PAGE;

  private pageSubject = new Subject<number>();

  public page$ = this.pageSubject.asObservable();

  public page(page: number) {
    this.pageValue = page;
    this.pageSubject.next(page);
  }

  public reset(): void {
    this.pageValue = PaginationService.START_PAGE;
  }
}
