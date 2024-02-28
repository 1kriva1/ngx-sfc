import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ISortingModel } from './sorting.model';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  private sortingSubject = new Subject<ISortingModel>();

  public sorting$ = this.sortingSubject.asObservable();

  public sort(model: ISortingModel): void {
    this.sortingSubject.next(model);
  }
}
