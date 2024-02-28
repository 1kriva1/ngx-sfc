import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IModalEvent } from './modal.event';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private subject = new BehaviorSubject<IModalEvent>({ open: false });

  public modal$: Observable<IModalEvent> = this.subject.asObservable();

  public get isOpen(): boolean {
    return this.subject.value.open;
  }

  public args: any;

  public toggle(): void {
    this.subject.next({ open: !this.isOpen });
  }

  public close(): void {
    this.subject.next({ open: false });
  }

  public open(args?: any): void {
    this.args = args;
    this.subject.next({ open: true, args: args });
  }
}
