export interface IDefaultModalFooterModel {
    cancelButton?: boolean;
    applyButton?: boolean;
    onCancel?: () => void;
    onApply?: () => void;
}