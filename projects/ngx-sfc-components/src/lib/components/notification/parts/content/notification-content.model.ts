import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface INotificationContentModel {
    title?: string;
    subTitle?: string;
    showButton?: boolean;
    buttonText?: string;
    icon?: IconDefinition;
    image?: string;
}
