import { Position } from "ngx-sfc-common";
import { ITableModel } from "../../../../models/table.model";
import { ITableColumnExtendedModel } from "../../../columns/table-column.model";

export interface IExpandedTableRowContextModel {
    model: ITableModel;
    columns: ITableColumnExtendedModel[];
    position: Position;
    expanded: boolean;
    even: boolean;
}