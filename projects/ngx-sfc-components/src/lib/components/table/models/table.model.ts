export interface ITableModel {
    index: number;
    sequence?: number;
    dataModel: ITableDataModel;
}

export interface ITableDataModel {
    data: any;
    selected?: boolean;
}