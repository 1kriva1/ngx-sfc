import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadMoreService {

    public static readonly START_PAGE: number = 1;

    private _page = LoadMoreService.START_PAGE;

    private moreSubject: Subject<number> = new Subject<number>();

    public more$: Observable<number> = this.moreSubject.asObservable();

    more(): void {
        this._page++;
        this.moreSubject.next(this._page);
    }

    reset(): void {
        this._page = LoadMoreService.START_PAGE;
    }
}
