import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadMoreService {

    public static readonly START_PAGE: number = 1;

    public pageValue = LoadMoreService.START_PAGE;

    private moreSubject: Subject<number> = new Subject<number>();

    public more$: Observable<number> = this.moreSubject.asObservable();

    public more(): void {
        this.pageValue++;
        this.moreSubject.next(this.pageValue);
    }

    public reset(): void {
        this.pageValue = LoadMoreService.START_PAGE;
    }
}
