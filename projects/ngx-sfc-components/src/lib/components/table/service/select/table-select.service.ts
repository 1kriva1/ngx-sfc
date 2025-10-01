import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { addItem, removeItem, ObservableModel } from 'ngx-sfc-common';
import { ITableSelectEvent } from './table-select.event';

@Injectable({
  providedIn: 'root'
})
export class TableSelectService {

  private model: ObservableModel<ITableSelectEvent> = new ObservableModel<ITableSelectEvent>();

  public get select$(): Observable<ITableSelectEvent> { return this.model.value$; }

  public selectedItems: number[] = [];

  public unselectedItems: number[] = [];

  public selectAll(selected: boolean): void {
    this.unselectedItems = [];
    this.selectedItems = [];
    this.model.subject.next({ index: null, selected: selected });
  }

  public select(index: number | null, selected: boolean): void {
    if (selected) {
      removeItem(this.unselectedItems, index);
      addItem(this.selectedItems, index);
    } else {
      addItem(this.unselectedItems, index);
      removeItem(this.selectedItems, index);
    }

    this.model.subject.next({ index, selected });
  }

  public selectSingle(event: ITableSelectEvent): void {
    if (event.selected) {
      this.unselectedItems = [];
      this.selectedItems = [event.index!];
    } else {
      this.selectedItems = [];
      this.unselectedItems = [event.index!];
    }

    this.model.subject.next(event);
  }
}