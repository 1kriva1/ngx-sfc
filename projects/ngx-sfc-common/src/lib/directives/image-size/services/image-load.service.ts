import { Injectable } from '@angular/core';
import { distinctUntilChanged, Observable, Subject } from 'rxjs';
import { ImageLoadEvent } from './image-load.event';

@Injectable({
  providedIn: 'root'
})
export class ImageLoadService {

  private loadSubject = new Subject<ImageLoadEvent>();

  public load$: Observable<ImageLoadEvent> = this.loadSubject.asObservable()
    .pipe(distinctUntilChanged());

  public load(value: ImageLoadEvent) {
    this.loadSubject.next(value);
  }
}
