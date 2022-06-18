import { TemplateRef } from "@angular/core";

export interface CarouselSlideModel {
    id: string;
    isActive?: boolean;
    tplRef: TemplateRef<any> | null;
    dataMerge?: number;
    width?: number | string;
    marginL?: number | string;
    marginR?: number | string;
    isCentered?: boolean;
    center?: boolean;
    isCloned?: boolean;
    load?: boolean;
    left?: number | string;
    classes: { [key: string]: boolean };
    isAnimated?: boolean;
    isDefAnimatedIn?: boolean;   
    isDefAnimatedOut?: boolean;   
    isCustomAnimatedIn?: boolean;   
    isCustomAnimatedOut?: boolean;
    heightState?: string;
}

export interface CarouselSlideEvent {
    startPosition?: number;
    slides?: CarouselSlideModel[];
};