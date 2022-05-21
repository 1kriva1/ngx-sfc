import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, ChartType, DefaultDataPoint } from 'chart.js';
import { isDefined, mergeDeep, Theme } from 'ngx-sfc-common';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { ChartOptionModel } from './chart-option.model';
import { CHART_DEFAULTS } from './chart.constants';
import { ChartSettingsService } from './service/settings/chart-settings.service';
import { ChartThemeModel } from './service/theme/chart-theme.model';
import { ChartThemeService } from './service/theme/chart-theme.service';

@Component({
  selector: 'sfc-chart',
  templateUrl: './chart.component.html',
  styles: [':host { height: inherit; width: inherit;}']
})
export class ChartComponent<TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
  TLabel = unknown> implements OnInit, AfterViewInit, OnDestroy {

  // Chart configuration

  @Input()
  type: ChartConfiguration<TType, TData, TLabel>['type'] = 'line' as TType;

  @Input()
  data!: ChartConfiguration<TType, TData, TLabel>['data'];

  @Input()
  options!: ChartConfiguration<TType, TData, TLabel>['options'];

  @Input()
  plugins?: ChartConfiguration<TType, TData, TLabel>['plugins'] = [];

  // End Chart configuration

  // Chart data configuration

  @Input()
  labels?: ChartConfiguration<TType, TData, TLabel>['data']['labels'];

  @Input()
  datasets?: ChartConfiguration<TType, TData, TLabel>['data']['datasets'];

  // End Chart data configuration

  @Input()
  chartOptions!: ChartOptionModel;

  @Input()
  public get theme() {
    return this._theme;
  }
  public set theme(value) {
    if (this._theme != value) {
      this._theme = value;
      this.themeService.setColors({ options: this.themeOptions });
    }
  }
  private _theme: Theme = Theme.Default;

  @ViewChild('chart')
  private canvas!: ElementRef;

  private chart?: Chart<TType, TData, TLabel>;

  private _themeSubscription?: Subscription;

  private get themeOptions(): ChartOptions {
    return this.theme === Theme.Dark ? CHART_DEFAULTS.THEME.DARK : CHART_DEFAULTS.THEME.DEFAULT;
  }

  public constructor(private zone: NgZone, private themeService: ChartThemeService, private settingsService: ChartSettingsService) {
    this._themeSubscription = this.themeService.colors$
      .pipe(distinctUntilChanged())
      .subscribe((model) => this.updateColors(model));
  }

  ngOnInit(): void {
    this.chartOptions = {
      ...this.settingsService.getDefaultChartOptions(this.type),
      ...this.chartOptions
    };
  }

  ngAfterViewInit(): void {
    const ctx = this.canvas.nativeElement.getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    this.zone.runOutsideAngular(() => this.chart = new Chart(ctx, this.getChartConfiguration()))
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }

    this._themeSubscription?.unsubscribe();
  }

  public update() {
    this.zone.runOutsideAngular(() => this.chart?.update());
  }

  private getChartConfiguration(): ChartConfiguration<TType, TData, TLabel> {
    return {
      type: this.type,
      data: this.getChartData(),
      options: this.getChartOptions(),
      plugins: this.plugins
    };
  }

  private getChartData(): ChartConfiguration<TType, TData, TLabel>['data'] {
    const chartData = this.data ? this.data : {
      labels: this.labels || [],
      datasets: this.datasets || []
    };

    if (this.chartOptions.defaultColors)
      this.settingsService.setDatasetStyles(this.type, chartData.datasets as any);

    return chartData;
  }

  private getChartOptions(): ChartConfiguration<TType, TData, TLabel>['options'] {
    const chartOptions = this.overrideDefaultOptionsByModel();
    return mergeDeep(chartOptions, this.options);
  }

  private overrideDefaultOptionsByModel(): void {
    const defaultChartOptions = this.settingsService.getDefaultOptions(this.type);

    defaultChartOptions.scales.x.grid.display = this.chartOptions.gridLines;
    defaultChartOptions.scales.x.display = this.chartOptions.xAxe;
    defaultChartOptions.scales.y.grid.display = this.chartOptions.gridLines;
    defaultChartOptions.scales.y.display = this.chartOptions.yAxe;
    defaultChartOptions.scales.x.ticks.display = this.chartOptions.ticks;
    defaultChartOptions.scales.y.ticks.display = this.chartOptions.ticks;
    defaultChartOptions.plugins.tooltip.enabled = this.chartOptions.tooltip;
    defaultChartOptions.plugins.legend.display = this.chartOptions.legend;

    return mergeDeep(defaultChartOptions, this.themeOptions);
  }

  private updateColors(model: ChartThemeModel): void {
    if (this.chart) {

      mergeDeep(this.chart.config.options, model.options);

      if (isDefined(model.dataSetColors))
        this.settingsService.setDatasetStyles(this.type, this.chart.config.data.datasets as any, model.dataSetColors);

      this.update();
    }
  }
}
