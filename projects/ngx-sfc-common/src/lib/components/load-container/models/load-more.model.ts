export interface ILoadMoreModel<T> {
    next: boolean;
    items: T[];
    reset: boolean;
}