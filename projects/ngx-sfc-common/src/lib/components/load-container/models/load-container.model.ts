import { Observable } from "rxjs";
import { ILoadContainerLoaderResultModel } from "./load-container-result.model";
import { ILoadContainerParameters } from "./load-container-parameters.model";
import { ILoadContainerPredicateParameters } from "./load-container-predicate-parameters.model";
import { LoadContainerLoadType } from "../enums/load-container-load-type.enum";
import { IPaginationModel } from "../../pagination/pagination.model";
import { ISortingModel } from "../../../services";
import { empty } from "../../../types";

export type LoaderFunction = (parameters: ILoadContainerParameters) => Observable<ILoadContainerLoaderResultModel<any>>;
export type FilterFunction = (data: any[], parameters: ILoadContainerParameters) => any[];
export interface ILoadContainerModel {
    loadType: LoadContainerLoadType;
    predicate$?: Observable<ILoadContainerPredicateParameters | null> | empty;
    data$?: Observable<any[]> | empty;
    loader?: LoaderFunction | empty;
    filter?: FilterFunction | empty;    
    pagination?: IPaginationModel | empty;
    sorting?: ISortingModel | empty;
}