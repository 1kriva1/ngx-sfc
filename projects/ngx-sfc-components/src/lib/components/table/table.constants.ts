import { ITableColumnExtendedModel } from "./parts/columns/table-column.model";
import { TableColumnType } from "./parts/columns/table-column-type.enum";

export class TableConstants {
    static SEQUENCE_COLUMN: ITableColumnExtendedModel = { name: '№', field: '', type: TableColumnType.Sequence };
    static SELECTABLE_COLUMN: ITableColumnExtendedModel = { name: '', field: '', type: TableColumnType.Selectable };
    static EXPANDED_COLUMN: ITableColumnExtendedModel = { name: '', field: '', type: TableColumnType.Expanded };    
    static NOT_FOUND_LABEL_DEFAULT: string = 'Not found';
    static LOAD_MORE_LABEL_DEFAULT: string = 'Show more';
    static TOTAL_LABEL_DEFAULT: string = 'Total';
    static DATA_LIST_LABEL: string = 'List';
    static DATA_CARDS_LABEL: string = 'Cards';
}