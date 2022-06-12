import { IDefaultTableColumnInnerModel } from "./parts/columns/table-column.model";
import { TableColumnType } from "./parts/columns/table-column-type.enum";
import { IToggleSwitcherModel } from "ngx-sfc-common";

export class TableConstants {
    static SEQUENCE_COLUMN: IDefaultTableColumnInnerModel = { name: '№', field: '', type: TableColumnType.Sequence };
    static SELECTABLE_COLUMN: IDefaultTableColumnInnerModel = { name: '', field: '', type: TableColumnType.Selectable };
    static EXPANDED_COLUMN: IDefaultTableColumnInnerModel = { name: '', field: '', type: TableColumnType.Expanded };
    static TOGGLE_SWITCHER_LEFT_MODEL: IToggleSwitcherModel = { label: 'List', icon: 'fa fa-table-list' };
    static TOGGLE_SWITCHER_RIGHT_MODEL: IToggleSwitcherModel = { label: 'Cards', icon: 'fa fa-border-all' };
    static DEFAULT_PAGE: number = 1;
    static DEFAULT_PAGE_SIZE: number = 5;
}