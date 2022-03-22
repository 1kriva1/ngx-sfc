import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { addItem, any, firstOrDefault, hasObjectItem, isDefined, nameof, removeItem, updateItem } from '../../../utils';
import { LoaderConstants } from '../loader.constants';
import { ILoaderEvent } from '../loader.event';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject: BehaviorSubject<ILoaderEvent[]> = new BehaviorSubject<ILoaderEvent[]>([]);

  private loaders$: Observable<ILoaderEvent[]> = this.loaderSubject
    .asObservable()
    .pipe(
      filter<ILoaderEvent[]>(loaders => any(loaders)),
      distinctUntilChanged()
    );

  /**
   * Show loader by Id
   * @param id Loader Id
   * @param register If true register loader and show it
   */
  public showLoader(id: string = LoaderConstants.GLOBAL_LOADER_ID, register: boolean = false)
    : Observable<ILoaderEvent> | null {
    return this.setLoaderStatus(id, true, register);
  }

  /**
   * Hide loader
   * @param id Loader Id
   */
  public hideLoader(id: string = LoaderConstants.GLOBAL_LOADER_ID): void {
    this.setLoaderStatus(id, false);
  }

  /**
   * Register loader for next use
   * @param event Loader event
   * @returns Registred loade observable
   */
  public registerLoader(event: ILoaderEvent): Observable<ILoaderEvent> {

    const loaders = this.loaderSubject.getValue();

    if (addItem(loaders, event,
      () => hasObjectItem(loaders, nameof<ILoaderEvent>('id'), event.id))) {
      this.loaderSubject.next(loaders);
    }

    return this.selectLoaderById(event.id);
  }

  /**
   * Remove loader
   * @param id Loader Id
   */
  public removeLoader(id: string = LoaderConstants.GLOBAL_LOADER_ID): void {
    const loaders = this.loaderSubject.getValue();

    if (removeItem(loaders, loader => loader.id == id)) {
      this.loaderSubject.next(loaders);
    }
  }

  private selectLoaderById(id: string): Observable<ILoaderEvent> {
    return this.loaders$
      .pipe(
        map(loaders => loaders.find(loader => loader.id == id) as ILoaderEvent),
        distinctUntilChanged()
      );
  }

  private setLoaderStatus(id: string, status: boolean, register: boolean = false): Observable<ILoaderEvent> | null {
    const loaders = this.loaderSubject.getValue(),
      ILoaderEvent: ILoaderEvent = { id, status },
      loader = firstOrDefault(loaders, (loader) => loader.id == id);

    if (isDefined(loader) && loader?.status == status)
      return this.selectLoaderById(id);

    const updatedLoaders = updateItem(loaders, (loader) => loader.id == id, ILoaderEvent);

    if (isDefined(updatedLoaders)) {
      this.loaderSubject.next(updatedLoaders as ILoaderEvent[]);
    }

    if (register) {
      return this.registerLoader(ILoaderEvent);
    }

    return null;
  }
}
