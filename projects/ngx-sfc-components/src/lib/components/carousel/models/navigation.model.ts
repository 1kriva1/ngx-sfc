export interface CarouselNavigationButtonModel {
    disabled: boolean;
    label: string;
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