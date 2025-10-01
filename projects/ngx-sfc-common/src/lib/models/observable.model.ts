import { BehaviorSubject, Observable, Subject } from "rxjs";

export class ObservableModel<T> {

    public subject: Subject<T> =  new Subject<T>();

    public value$: Observable<T> = this.subject.asObservable();
}


export class ObservableBehaviorModel<T> {

    constructor(private defaultValue: T | null = null) { }

    public subject: BehaviorSubject<T> = new BehaviorSubject<T>(this.defaultValue!);

    public value$: Observable<T> = this.subject.asObservable();

    public get value(): T | null { return this.subject.value; }
}