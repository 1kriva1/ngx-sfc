import { ChartConfiguration } from "chart.js";

export interface ChartThemeModel {
    options?: ChartConfiguration['options'];
    dataSetColors?: ChartThemeDataSetColors[];
}

export interface ChartThemeDataSetColors {
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    borderColor?: string;
    hoverBorderColor?: string;
    pointBackgroundColor?: string;
    pointHoverBackgroundColor?: string;
    pointBorderColor?: string;
    pointHoverBorderColor?: string;
}