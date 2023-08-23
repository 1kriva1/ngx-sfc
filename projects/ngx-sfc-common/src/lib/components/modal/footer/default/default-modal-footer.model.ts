export interface IDefaultModalFooterModel {
    cancelButton?: boolean;
    cancelButtonText?: string;
    onCancel?: (args:any) => void;
    applyButton?: boolean;
    applyButtonText?: string;
    onApply?: (args:any) => void;
}