import { IAvatarInputModalEventModel } from "./avatar-input-modal-event.model";

export interface IAvatarInputModalContextModel {
    value: number | null;
    onSelect: (model: IAvatarInputModalEventModel, selected: boolean) => void;
}