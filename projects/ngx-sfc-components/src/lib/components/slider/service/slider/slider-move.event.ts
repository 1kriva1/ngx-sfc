import { SliderMoveType } from "./slider-move-type.enum";

export interface ISliderMoveEvent {
    type: SliderMoveType;
    index?: number;
}