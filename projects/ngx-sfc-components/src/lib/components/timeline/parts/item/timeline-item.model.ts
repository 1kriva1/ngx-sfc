import { TimelineItemPosition } from "./timeline-item-position.enum";

export interface ITimelineItemModel{
    title: string;
    position?: TimelineItemPosition;
    dateTimeLabel?: string;
    description?: string;
    period?: boolean;    
    icon?: string;
    image?: string;
}