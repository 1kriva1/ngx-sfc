export interface ILoadContainerResultModel<T> {
    next: boolean;
    items: T[];
    total: number;
    reset: boolean;
    page: number;
}

export interface ILoadContainerLoaderResultModel<T> {
    next: boolean;
    items: T[];
    total: number;
}