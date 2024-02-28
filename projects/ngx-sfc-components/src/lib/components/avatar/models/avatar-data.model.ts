import { empty } from "ngx-sfc-common";

export interface IAvatarDataModel {
    firstName?: string | empty;
    lastName?: string | empty;
    image?: string | File | empty;
    title?: string | empty;
}
