import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IImageExportEvent } from './image-export.event';

@Injectable()
export class ImageService {

  private cropSubject: Subject<void> = new Subject();
  public crop$: Observable<void> = this.cropSubject.asObservable();

  private exportSubject: Subject<IImageExportEvent> = new Subject<IImageExportEvent>();
  public export$: Observable<IImageExportEvent> = this.exportSubject.asObservable();  

  public imageFile!: File;

  public crop() {
    this.cropSubject.next();
  }

  public export(event: IImageExportEvent) {
    this.exportSubject.next(event);
  }
}
