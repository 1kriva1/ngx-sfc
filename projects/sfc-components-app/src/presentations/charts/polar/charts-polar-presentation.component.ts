import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartTwoPresentationComponent } from '../base/base-chart-two-presentations.component';

@Component({
  templateUrl: './charts-polar-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss'],
  styles: ['.component-column{ height: 15em; width: 30em;flex-direction: column;}']
})
export class ChartsPolarPresentationComponent extends BaseChartTwoPresentationComponent {

  public override chartType: ChartType = 'polarArea';

  public override dataSets: ChartConfiguration['data']['datasets'] = [
    { data: [350, 450, 100] }
  ];

  public override duoChartData: ChartConfiguration['data'] = {
    labels: ['Series A', 'Series B'],
    datasets: [
      { data: [350, 450] }
    ]
  }

  public override allDefaultColorsChartData: ChartConfiguration['data'] = {
    labels: ['Series A', 'Series B', 'Series C', 'Series D', 'Series E', 'Series F', 'Series G', 'Series H', 'Series J', 'Series K'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40, 11, 23, 76] }
    ]
  }

  public override getData() {
    return {
      labels: ['Series A'],
      datasets: [
        {
          data: [350],
          label: "Series A"
        }
      ]
    }
  }
}
