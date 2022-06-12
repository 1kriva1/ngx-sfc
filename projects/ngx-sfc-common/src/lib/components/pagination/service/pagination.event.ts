export interface IPaginationEvent {
    // current page
    page: number;

    // next page
    next: number;

    // previous page
    previous: number;

    // total pages
    total: number;
}