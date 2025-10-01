import { IAvatarInputModel } from "./avatar-input.model";

export interface IAvatarInputModalEventModel {
    value: number | null;
    model: any | null;
    avatarModel: IAvatarInputModel | null;
}