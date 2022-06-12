import { Position } from "ngx-sfc-common";
import { ITableModel } from "../../../../models/table.model";
import { IDefaultTableColumnInnerModel } from "../../../columns/table-column.model";

export interface IExpandedTableRowContextModel {
    model: ITableModel;
    columns: IDefaultTableColumnInnerModel[];
    columnWidth: number;
    position: Position;
    expanded: boolean;
    even: boolean;
}