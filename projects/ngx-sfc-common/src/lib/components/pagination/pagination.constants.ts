import { IPaginationModel } from "./pagination.model";

export class PaginationConstants {
    static DEFAULT_SIZE = 5;
    static DEFAULT_PAGE = 1;
    static DEFAULT_COUNT = 3;
    static DEFAULT_TOTAL = 0;
    static DEFAULT_PAGINATION: IPaginationModel = { page: this.DEFAULT_PAGE, size: this.DEFAULT_SIZE };
}