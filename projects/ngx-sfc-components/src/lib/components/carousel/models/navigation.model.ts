import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { empty } from "ngx-sfc-common";

export interface CarouselNavigationButtonModel {
    disabled: boolean;
    label?: string | empty;
    icon?: IconDefinition | empty
}

export interface CarouselNavigationModel {
    disabled: boolean;
    previous: CarouselNavigationButtonModel;
    next: CarouselNavigationButtonModel;
}

export interface CarouselNavigationDot {
    id: string;
    active: boolean;
}

export interface CarouselNavigationDotsModel {
    disabled: boolean;
    dots: CarouselNavigationDot[];
}