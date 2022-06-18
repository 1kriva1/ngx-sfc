import { CarouselDOMModel } from "../../models/dom.model";
import { CarouselNavigationDotsModel, CarouselNavigationModel } from "../../models/navigation.model";
import { CarouselSlideModel } from "../../models/slide.model";
import { CarouselStageModel } from "../../parts/stage/carousel-stage.model";

export interface States {
    current: {};
    tags: {
        [key: string]: string[];
    };
}

export interface Coords {
    x: number;
    y: number;
}

export interface CarouselCurrentData {
    carouselDOMModel: CarouselDOMModel;
    stageModel: CarouselStageModel;
    slidesModel: CarouselSlideModel[];
    navigationModel: CarouselNavigationModel;
    navigationDotsModel: CarouselNavigationDotsModel;
}