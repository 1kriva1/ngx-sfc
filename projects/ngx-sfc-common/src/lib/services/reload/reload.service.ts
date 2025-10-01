import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ObservableModel } from "../../models";

@Injectable({ providedIn: 'root' })
export class ReloadService {

    /* Properties */

    private model: ObservableModel<string[]> = new ObservableModel<string[]>();

    public get reload$(): Observable<string[]> { return this.model.value$; }

    /* End Properties */

    public reload(...ids: string[]): void {
        this.model.subject.next(ids);
    }
}