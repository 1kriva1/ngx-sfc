export interface IPaginationViewModel {
    range: number[];
    page: number;
    next: number;
    previous: number;
    total: number;
    any: boolean;
    firstPage: boolean;
    lastPage: boolean;
    previousPage: boolean;
    nextPage: boolean;
}