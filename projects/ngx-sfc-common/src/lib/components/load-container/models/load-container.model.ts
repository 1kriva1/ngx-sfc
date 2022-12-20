import { Observable } from "rxjs";
import { ILoadMoreModel } from "./load-more.model";
import { ILoadMoreParameters } from "./load-more-parameters.model";

export type LoaderFunction = (parameters: ILoadMoreParameters) => Observable<ILoadMoreModel<any>>;
export type FilterFunction = (data: any[], parameters: ILoadMoreParameters) => any[];
export interface ILoadContainerModel {
    predicate$?: Observable<any>;
    data$?: Observable<any[]>;
    loader?: LoaderFunction;
    filter?: FilterFunction;
}