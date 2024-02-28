import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Position, empty } from "ngx-sfc-common";
import { AvatarBadgePosition } from "./avatar-badge-position.enum";

export interface IAvatarBadgeTooltipModel {
    value?: string | empty;
    position: Position;
}

export interface IAvatarBadgeModel {
    label?: string | empty;
    icon?: IconDefinition | empty;
    position: AvatarBadgePosition;
    background?: string | empty;
    tooltip?: IAvatarBadgeTooltipModel;
}