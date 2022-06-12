import { Inject, Injectable } from '@angular/core';
import { MediaLimits, ResizeService, WINDOW } from 'ngx-sfc-common';
import { map, merge, Observable, shareReplay, startWith, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnsToggleService {

  // current state of toggle 
  private showColumns: boolean = false;

  private toggleSubject = new Subject<void>();

  // toggle state observable
  private toggle$ = this.toggleSubject.asObservable()
    .pipe(
      tap(() => this.showColumns = !this.showColumns),
      shareReplay()
    );

  constructor(@Inject(WINDOW) private window: Window, private resizeService: ResizeService) { }

  // show column observable 
  public showColumns$: Observable<boolean> = merge(
    this.resizeService.onResize$.pipe(startWith(null)),
    this.toggle$
  ).pipe(map(() => this.window.innerWidth >= MediaLimits.Tablet ? true : this.showColumns));

  public toggle() {
    this.toggleSubject.next();
  }
}
