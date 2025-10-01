import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableModel } from '../../../models';
import { IModalEvent } from './modal.event';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private model: ObservableModel<IModalEvent> = new ObservableModel<IModalEvent>();

  /* Properties */

  public get modal$(): Observable<IModalEvent> { return this.model.value$; }

  public isOpen: boolean = false;

  public args: any;

  /* End Properties */

  public toggle(id: any, args?: any): void {
    this.emit({ open: !this.isOpen, id: id, args: args });
  }

  public close(id: any, args?: any): void {
    this.emit({ open: false, id: id, args: args });
  }

  public open(id: any, args?: any): void {
    this.emit({ open: true, id: id, args: args });
  }

  private emit(event: IModalEvent): void {
    this.args = event.args;
    this.isOpen = event.open;
    this.model.subject.next(event);
  }
}