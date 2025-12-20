import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnsToggleService {

  // current state of toggle 
  public show: boolean = false;

  private toggleSubject = new BehaviorSubject<boolean>(this.show);

  // toggle state observable
  public toggle$ = this.toggleSubject.asObservable();

  public toggle(): void {
    this.toggleSubject.next(this.show = !this.show);
  }

  public set(show: boolean): void {
    this.show = show;
    this.toggleSubject.next(this.show);
  }
}
