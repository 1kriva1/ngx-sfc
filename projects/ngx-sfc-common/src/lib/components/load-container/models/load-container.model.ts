import { Observable } from "rxjs";
import { ILoadMoreModel } from "./load-more.model";
import { ILoadMoreParameters } from "./load-more-parameters.model";
import { ILoadMorePredicateParameters } from "./load-more-predicate-parameters.model";
import { LoadChangesSource } from "../load-container.enum";

export type LoaderFunction = (parameters: ILoadMoreParameters, source: LoadChangesSource) => Observable<ILoadMoreModel<any>>;
export type FilterFunction = (data: any[], parameters: ILoadMoreParameters) => any[];
export interface ILoadContainerModel {
    size?: number;
    predicate$?: Observable<ILoadMorePredicateParameters | null>;
    data$?: Observable<any[]>;
    loader?: LoaderFunction;
    filter?: FilterFunction;
}