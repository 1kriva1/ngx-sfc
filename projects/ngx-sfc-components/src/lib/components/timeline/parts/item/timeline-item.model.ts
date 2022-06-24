import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { TimelineItemPosition } from "./timeline-item-position.enum";

export interface ITimelineItemModel{
    title: string;
    position?: TimelineItemPosition;
    dateTimeLabel?: string;
    description?: string;
    period?: boolean;    
    icon?: IconDefinition;
    image?: string;
}