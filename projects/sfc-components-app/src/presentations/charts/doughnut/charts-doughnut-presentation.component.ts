import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartTwoPresentationComponent } from '../base/base-chart-two-presentations.component';

@Component({
  templateUrl: './charts-doughnut-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss'],
  styles: ['.component-column{ height: 15em; width: 30em;flex-direction: column;}']
})
export class ChartsDoughnutPresentationComponent extends BaseChartTwoPresentationComponent {

  public override chartType: ChartType = 'doughnut';

}
