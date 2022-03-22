import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private subjectClose = new Subject<void>();

  private subjectOpen = new Subject<any>();

  close$: Observable<any> = this.subjectClose.asObservable();

  open$: Observable<any> = this.subjectOpen.asObservable();

  close() {
    this.subjectClose.next();
  }

  open(options: any) {
    this.subjectOpen.next(options);
  }
}
