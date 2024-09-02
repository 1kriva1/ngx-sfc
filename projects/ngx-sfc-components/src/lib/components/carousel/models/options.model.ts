import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface CarouselOptions {
    items?: number;
    skip_validateItems?: boolean;
    loop?: boolean;
    center?: boolean;
    rewind?: boolean;
    margin?: number;
    stagePadding?: number;
    merge?: boolean;
    mergeFit?: boolean;
    autoWidth?: boolean;
    responsiveRefreshRate?: number;
    nav?: boolean;
    navBottom?: boolean;
    navSpeed?: number | boolean;
    slideBy?: number | string;
    dots?: boolean;
    dotsEach?: number | boolean;
    dotsSpeed?: number | boolean;
    autoplay?: boolean;
    autoplayTimeout?: number;
    autoplaySpeed?: number | boolean;
    autoplayMouseleaveTimeout?: number;
    slideTransition?: string;
    animateOut?: string | boolean;
    animateIn?: string | boolean;
    autoHeight?: boolean;
}

export interface CarouselResponsiveModel {
    [key: number]: CarouselOptions;
}

export interface CarouselOptionsModel extends CarouselOptions {
    startPosition?: number | string;
    rtl?: boolean;
    responsive?: CarouselResponsiveModel;
    navText?: string[];
    navIcons?: IconDefinition[];
    navigationDotsModel?: boolean;
    autoplayHoverPause?: boolean;
    lazyLoad?: boolean;
    lazyLoadEager?: number;
}