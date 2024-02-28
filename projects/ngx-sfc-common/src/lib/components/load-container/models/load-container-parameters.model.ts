import { ISortingModel } from "../../../services";
import { empty } from "../../../types";
import { ILoadContainerPredicateParameters } from "./load-container-predicate-parameters.model";

export interface ILoadContainerParameters {
    params: ILoadContainerPredicateParameters,
    page: number
    sorting?: ISortingModel | empty;
}