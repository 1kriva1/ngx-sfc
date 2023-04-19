import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { NotificationType } from "../../enums/notification-type.enum";

export interface INotificationContentModel {
    id?: any;
    title?: string;
    subTitle?: string;
    showButton?: boolean;
    buttonText?: string;
    icon?: IconDefinition;
    image?: string;
    type?: NotificationType;
}
