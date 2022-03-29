import { ITabSliderContextModel } from "../parts/sliders/tab-slider-context.model";
import { ITabModel } from "./tab.model";

export interface ITabsViewModel {
    tabs: ITabModel[];
    selectedTab: ITabModel | null;
    sliderContextData: ITabSliderContextModel;
    tabWidth: number;
}