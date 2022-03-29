import { Observable, Subject } from 'rxjs';

export class TabService {

    private selectSubject: Subject<number> = new Subject<number>();

    public selected$: Observable<number> = this.selectSubject.asObservable();

    select(index: number) {
        this.selectSubject.next(index);
    }
}
