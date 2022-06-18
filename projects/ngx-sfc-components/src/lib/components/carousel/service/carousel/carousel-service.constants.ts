import { CarouselOptionsModel } from "../../models/options.model";

export class CarouselServiceConstants {
    static CLONE_ID_PREFIX: string = 'cloned-';
    static DEFAULT_OPTIONS: CarouselOptionsModel = {
        items: 3,
        skip_validateItems: false,
        loop: false,
        center: false,
        rewind: false,
        margin: 0,
        stagePadding: 0,
        merge: false,
        mergeFit: true,
        autoWidth: false,
        startPosition: 0,
        rtl: false,
        responsive: {},
        responsiveRefreshRate: 200,
        // defaults to Navigation
        nav: false,
        navText: ['prev', 'next'],
        navSpeed: false,
        slideBy: 1,
        dots: true,
        dotsEach: false,
        navigationDotsModel: false,
        dotsSpeed: false,
        // defaults to Autoplay
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        autoplaySpeed: false,
        autoplayMouseleaveTimeout: 1,
        // defaults to LazyLoading
        lazyLoad: false,
        lazyLoadEager: 0,
        // defaults to Animate
        slideTransition: '',
        animateOut: false,
        animateIn: false,
        // defaults to AutoHeight
        autoHeight: false
    }
}