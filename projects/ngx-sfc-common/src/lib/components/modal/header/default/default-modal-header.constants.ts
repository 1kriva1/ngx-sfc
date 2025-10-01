import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { IDefaultModalHeaderModel } from "./default-modal-header.model";

export class DefaultModalHeaderConstants {
    static DEFAULT_MODAL_HEADER_MODEL: IDefaultModalHeaderModel = {
        icon: faWindowRestore,
        showCloseIcon: true,
        text: 'Modal'
    };
}