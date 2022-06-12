import { ISortingModel } from "ngx-sfc-common";
import { TableColumnType } from "./table-column-type.enum";

export interface IDefaultTableColumnModel {
    name: string;
    field: string;
    icon?: string;
    sorting?: ISortingModel;
}

export interface IDefaultTableColumnInnerModel extends IDefaultTableColumnModel {
    type?: TableColumnType;
}
