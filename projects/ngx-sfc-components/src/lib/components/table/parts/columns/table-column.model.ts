import { ISortingModel } from "ngx-sfc-common";
import { TableColumnType } from "./table-column-type.enum";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IDefaultTableColumnModel {
    name: string;
    field: string;
    icon?: IconDefinition;
    sorting?: ISortingModel;
}

export interface IDefaultTableColumnInnerModel extends IDefaultTableColumnModel {
    type?: TableColumnType;
}
