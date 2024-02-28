import { Injectable } from '@angular/core';
import { addItem, removeItem } from 'ngx-sfc-common';
import { Observable, Subject } from 'rxjs';
import { ITableSelectEvent } from './table-select.event';

@Injectable({
  providedIn: 'root'
})
export class TableSelectService {

  private selectSubject = new Subject<ITableSelectEvent>();

  public select$: Observable<ITableSelectEvent> = this.selectSubject.asObservable();

  public selectedItems: number[] = [];

  public unselectedItems: number[] = [];

  public selectAll(selected: boolean): void {
    this.unselectedItems = [];
    this.selectedItems = [];
    this.selectSubject.next({ index: null, selected: selected });
  }

  public select(index: number | null, selected: boolean): void {    
    if (selected) {
      removeItem(this.unselectedItems, index)
      addItem(this.selectedItems, index)
    } else {
      addItem(this.unselectedItems, index)
      removeItem(this.selectedItems, index)
    }

    this.selectSubject.next({ index, selected });
  }
}
