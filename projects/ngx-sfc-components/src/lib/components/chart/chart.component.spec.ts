import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  TimeSeriesScale,
  Title,
  Tooltip
} from 'chart.js';
import { Theme } from 'ngx-sfc-common';
import { ChartComponent } from './chart.component';
import { CHART_DEFAULTS } from './chart.constants';

describe('Component: ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent<any, any, any>>;

  beforeEach(async () => {
    Chart.register(
      Title, Tooltip, Filler, Legend,
      LineController, LineElement, PointElement, LinearScale, CategoryScale,
      BarController, BarElement,
      DoughnutController, ArcElement,
      RadarController, RadialLinearScale,
      PieController,
      PolarAreaController,
      BubbleController,
      ScatterController,
      TimeSeriesScale);

    await TestBed.configureTestingModule({
      declarations: [ChartComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create component', () => {
      expect(component).toBeTruthy();
    });

    fit('Should have main element', () => {
      expect(fixture.nativeElement.querySelector('canvas')).toBeTruthy();
    });

    fit('Should have default chart type', () => {
      expect(component.type).toEqual('line');
    });

    fit('Should call getDefaultChartOptions method of ChartSettings service', () => {
      const getDefaultChartOptionsSpy = spyOn<any>((component as any).settingsService, 'getDefaultChartOptions');

      component.ngOnInit();

      expect(getDefaultChartOptionsSpy).toHaveBeenCalledOnceWith(component.type);
    });

    fit('Should have default chart options', () => {
      expect(component.chartOptions).toEqual({ legend: true, gridLines: true, xAxe: true, yAxe: true, tooltip: true, ticks: true, defaultColors: true });
    });

    fit('Should have defined chart options', () => {
      component.chartOptions = { legend: false };      

      component.ngOnInit();

      expect(component.chartOptions).toEqual({ legend: false, gridLines: true, xAxe: true, yAxe: true, tooltip: true, ticks: true, defaultColors: true });
    });

    fit('Should destroy chart on component destroy event', () => {
      const destroySpy = spyOn<any>((component as any).chart, 'destroy');

      component.ngOnDestroy();

      expect(destroySpy).toHaveBeenCalledTimes(1);
      expect((component as any).chart).toBeUndefined();
    });

    fit('Should call setDatasetStyles method of ChartSettings service', () => {
      const setDatasetStylesSpy = spyOn<any>((component as any).settingsService, 'setDatasetStyles');

      component.ngAfterViewInit();

      expect(setDatasetStylesSpy).toHaveBeenCalledOnceWith(component.type, []);
    });

    fit('Should not call setDatasetStyles method of ChartSettings service, when defaultColors is false', () => {
      const setDatasetStylesSpy = spyOn<any>((component as any).settingsService, 'setDatasetStyles');
      component.data = { datasets: [] };
      component.chartOptions.defaultColors = false;

      component.ngAfterViewInit();

      expect(setDatasetStylesSpy).not.toHaveBeenCalled();
    });

    fit('Should call getDefaultOptions method of ChartSettings service', () => {
      const getDefaultOptionsSpy = spyOn<any>((component as any).settingsService, 'getDefaultOptions')
        .and.returnValue({
          scales: {
            x: {
              grid: {},
              ticks: {}
            },
            y: {
              grid: {},
              ticks: {}
            },
            r: {}
          },
          plugins: {
            tooltip: {},
            legend: {}
          }
        });

      component.ngAfterViewInit();

      expect(getDefaultOptionsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Theme', () => {
    fit('Should not call setColors method of ChartTheme service', () => {
      const setColorsSpy = spyOn<any>((component as any).themeService, 'setColors');

      component.theme = Theme.Default;

      expect(setColorsSpy).not.toHaveBeenCalled();
    });

    fit('Should call setColors method of ChartTheme service', () => {
      const setColorsSpy = spyOn<any>((component as any).themeService, 'setColors');

      component.theme = Theme.Dark;

      expect(setColorsSpy).toHaveBeenCalledTimes(1);
    });

    fit('Should call setColors method with dark options', () => {
      const setColorsSpy = spyOn<any>((component as any).themeService, 'setColors');

      component.theme = Theme.Dark;

      expect(setColorsSpy).toHaveBeenCalledOnceWith({ options: CHART_DEFAULTS.THEME.DARK });
    });

    fit('Should call setColors method with default options', () => {
      const setColorsSpy = spyOn<any>((component as any).themeService, 'setColors');

      component.theme = Theme.Dark;
      component.theme = Theme.Default;

      expect(setColorsSpy).toHaveBeenCalledTimes(2);
      expect(setColorsSpy).toHaveBeenCalledWith({ options: CHART_DEFAULTS.THEME.DEFAULT });
    });

    fit("Should call unsubscribe on theme subscription, when component destroyed", () => {
      const unsubscribeSpy = spyOn(
        (component as any)._themeSubscription,
        'unsubscribe'
      ).and.callThrough();

      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });

    fit('Should update chart if theme has changed', () => {
      const updateSpy = spyOn(component, 'update');
      component.theme = Theme.Dark;

      expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    fit('Should not call setDatasetStyles method of ChartSettings service', () => {
      const setDatasetStylesSpy = spyOn<any>((component as any).settingsService, 'setDatasetStyles');

      (component as any).themeService.setColors({ options: CHART_DEFAULTS.THEME.DARK });

      expect(setDatasetStylesSpy).not.toHaveBeenCalled();
    });

    fit('Should call setDatasetStyles method of ChartSettings service', () => {
      const setDatasetStylesSpy = spyOn<any>((component as any).settingsService, 'setDatasetStyles');

      (component as any).themeService.setColors({ dataSetColors: [{ backgroundColor: 'red' }] });

      expect(setDatasetStylesSpy).toHaveBeenCalledOnceWith('line', [], [{ backgroundColor: 'red' }]);
    });
  });
});
