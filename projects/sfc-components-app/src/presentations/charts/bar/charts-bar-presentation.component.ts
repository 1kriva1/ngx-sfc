import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartOnePresentationComponent } from '../base/base-chart-one-presentations.component';

@Component({
  templateUrl: './charts-bar-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss'],
  styles: ['.component-column{ height: 15em; width: 30em;flex-direction: column;}']
})
export class ChartsBarPresentationComponent extends BaseChartOnePresentationComponent {

  public override chartType: ChartType = 'bar';
}
