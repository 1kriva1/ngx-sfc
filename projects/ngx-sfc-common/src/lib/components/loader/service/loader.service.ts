import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { addItem, firstOrDefault, hasObjectItem, isDefined, nameof, removeItem, updateItem } from '../../../utils';
import { LoaderConstants } from '../loader.constants';
import { LoaderEvent } from '../loader.event';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject: BehaviorSubject<LoaderEvent[]> = new BehaviorSubject<LoaderEvent[]>([]);

  private loaders$: Observable<LoaderEvent[]> = this.loaderSubject
    .asObservable()
    .pipe(
      filter<LoaderEvent[]>(Boolean),
      distinctUntilChanged()
    );

  /**
   * Show loader by Id
   * @param id Loader Id
   * @param register If true register loader and show it
   */
  public showLoader(id: string = LoaderConstants.GLOBAL_LOADER_ID, register: boolean = false)
    : Observable<LoaderEvent> | null {
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
  public registerLoader(event: LoaderEvent): Observable<LoaderEvent> {

    const loaders = this.loaderSubject.getValue();

    if (addItem(loaders, event,
      () => hasObjectItem(loaders, nameof<LoaderEvent>('id'), event.id))) {
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

  private selectLoaderById(id: string): Observable<LoaderEvent> {
    return this.loaders$
      .pipe(
        map(loaders => loaders.find(loader => loader.id == id) as LoaderEvent),
        distinctUntilChanged()
      );
  }

  private setLoaderStatus(id: string, status: boolean, register: boolean = false): Observable<LoaderEvent> | null {
    const loaders = this.loaderSubject.getValue(),
      loaderEvent: LoaderEvent = { id, status },
      loader = firstOrDefault(loaders, (loader) => loader.id == id);

    if (isDefined(loader) && loader?.status == status)
      return this.selectLoaderById(id);

    const updatedLoaders = updateItem(loaders, (loader) => loader.id == id, loaderEvent);

    if (isDefined(updatedLoaders)) {
      this.loaderSubject.next(updatedLoaders as LoaderEvent[]);
    }

    if (register) {
      return this.registerLoader(loaderEvent);
    }

    return null;
  }
}
