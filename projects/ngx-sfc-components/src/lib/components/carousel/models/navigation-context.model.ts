import { CarouselNavigationButtonModel } from "./navigation.model";

export interface INavigationContextModel {
    next: INavigationButtonContextModel;
    previous: INavigationButtonContextModel;
}

export interface INavigationButtonContextModel {
    model: CarouselNavigationButtonModel;
    action: () => void;
}