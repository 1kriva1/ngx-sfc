import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { isDefined } from 'ngx-sfc-common';
import { ChartOptionModel } from '../../chart-option.model';
import { CHART_DEFAULTS } from '../../chart.constants';
import { ChartThemeDataSetColors } from '../theme/chart-theme.model';

@Injectable({
  providedIn: 'root'
})
export class ChartSettingsService {

  getDefaultOptions(type: ChartType) {
    let defaultChartOptions:ChartConfiguration['options'] = {};

    switch (type) {
      case 'polarArea':
      case 'radar':
        defaultChartOptions = CHART_DEFAULTS.OPTIONS_RADIAL;
        break;
      case 'pie':
      case 'doughnut':
        defaultChartOptions = CHART_DEFAULTS.OPTIONS_NOT_LINES;
        break;
      default:
        defaultChartOptions = CHART_DEFAULTS.OPTIONS;
        break;
    }

    return JSON.parse(JSON.stringify(defaultChartOptions))
  }

  getDefaultChartOptions(type: ChartType): ChartOptionModel {
    switch (type) {
      case 'pie':
      case 'radar':
      case 'polarArea':
      case 'doughnut':
        return { legend: true, gridLines: true, xAxe: false, yAxe: false, tooltip: true, ticks: true, defaultColors: true };
      default:
        return { legend: true, gridLines: true, xAxe: true, yAxe: true, tooltip: true, ticks: true, defaultColors: true };
    }
  }  

  setDatasetStyles(type: ChartType, datasets: ChartDataset[], colors?: ChartThemeDataSetColors[]): void {
    switch (type) {
      case 'polarArea':
      case 'pie':
      case 'doughnut':
        this.setBackgroundDatasetStyles(datasets, colors || CHART_DEFAULTS.COLORS);
        break;
      case 'radar':
        this.setDefaultDatasetStyles(datasets, colors || CHART_DEFAULTS.HALF_TRANSPARENT_COLORS);
        break;
      default:
        this.setDefaultDatasetStyles(datasets, colors || CHART_DEFAULTS.COLORS);
        break;
    }
  }

  private setDefaultDatasetStyles(datasets: ChartDataset[], colors: ChartThemeDataSetColors[]) {
    datasets.forEach((item: any, index: number) => {
      if (index <= colors.length - 1) {
        const dataSetColor = colors[index];

        item.backgroundColor = dataSetColor.backgroundColor;
        item.hoverBackgroundColor = dataSetColor.hoverBackgroundColor;
        item.borderColor = dataSetColor.borderColor;
        item.hoverBorderColor = dataSetColor.hoverBorderColor;
        item.pointBackgroundColor = dataSetColor.pointBackgroundColor;
        item.pointHoverBackgroundColor = dataSetColor.pointHoverBackgroundColor;
        item.pointBorderColor = dataSetColor.pointBorderColor;
        item.pointHoverBorderColor = dataSetColor.pointHoverBorderColor;
      }
    });
  }

  private setBackgroundDatasetStyles(datasets: ChartConfiguration['data']['datasets'], colors: ChartThemeDataSetColors[]) {
    datasets.forEach((item: ChartDataset) => {
      item.backgroundColor = this.replaceColors(item.backgroundColor, colors, c => c.backgroundColor);
      item.hoverBackgroundColor = this.replaceColors(item.hoverBackgroundColor, colors, c => c.hoverBackgroundColor);
    });
  }

  private replaceColors(oldColors: any, newColors: ChartThemeDataSetColors[],
    mapFunc: (color: ChartThemeDataSetColors) => string | undefined) {
    const colors = newColors.map(mapFunc).filter((color) => isDefined(color));
    if (oldColors) {
      oldColors.splice(0, Math.min(oldColors.length, colors.length));
      return colors.concat(oldColors);
    }

    return colors;
  }
}
