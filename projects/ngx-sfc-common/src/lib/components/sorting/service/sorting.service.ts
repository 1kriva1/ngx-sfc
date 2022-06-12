import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ISortingEvent } from './sorting.event';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  private sortingSubject = new Subject<ISortingEvent>();

  sorting$ = this.sortingSubject.asObservable();

  sort(event: ISortingEvent) {
    this.sortingSubject.next(event);
  }
}
