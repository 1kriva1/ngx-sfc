import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartOnePresentationComponent } from '../base/base-chart-one-presentations.component';

@Component({
  templateUrl: './charts-radar-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss'],
  styles: ['.component-column{ height: 15em; width: 30em;flex-direction: column;}']
})
export class ChartsRadarPresentationComponent extends BaseChartOnePresentationComponent {

  public override chartType: ChartType = 'radar';

  public override duoChartData: ChartConfiguration['data'] = {
    labels: this.labels,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: "Series A"
      },
      {
        data: [45, 19, 30, 61, 96, 75, 50],
        label: "Series B"
      }
    ]
  };
}
