import { empty } from "ngx-sfc-common";
import { TableColumnType } from "./table-column-type.enum";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ISortingModel } from "./sorting/sorting-column.model";

export interface ITableColumnModel {
    name: string;
    field: string;
    icon?: IconDefinition | empty;
    sorting?: ISortingModel | empty;
    width?: number | empty;
}

export interface ITableColumnExtendedModel extends ITableColumnModel {
    type?: TableColumnType;
    calculatedWidth?: string;
}
