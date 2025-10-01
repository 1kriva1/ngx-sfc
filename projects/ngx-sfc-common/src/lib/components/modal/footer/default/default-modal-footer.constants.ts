import { IDefaultModalFooterModel } from "./default-modal-footer.model";

export class DefaultModalFooterConstants {
    static BUTTON_CUSTOM_SIZE: number = 0.9;
    static DEFAULT_MODAL_FOOTER_MODEL: IDefaultModalFooterModel = {
        cancelButton: true,
        applyButton: true,
        applyButtonText: 'Ok',
        cancelButtonText: 'Cancel'
    }
}