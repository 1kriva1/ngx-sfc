import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITableSelectEvent } from './table-select.event';

@Injectable({
  providedIn: 'root'
})
export class TableSelectService {

  private selectSubject = new Subject<ITableSelectEvent>();

  public select$: Observable<ITableSelectEvent> = this.selectSubject.asObservable();

  public selectAll(selected: boolean) {
    this.selectSubject.next({ index: null, selected: selected });
  }

  public select(index: number | null, selected: boolean) {
    this.selectSubject.next({ index, selected });
  }
}
