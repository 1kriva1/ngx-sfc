import { TestBed } from '@angular/core/testing';
import { CHART_DEFAULTS } from '../../chart.constants';
import { ChartThemeDataSetColors } from '../theme/chart-theme.model';
import { ChartSettingsService } from './chart-settings.service';

describe('Service: ChartSettings', () => {
    let service: ChartSettingsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ChartSettingsService);
    });

    fit('Should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Get Default Options', () => {
        fit('Should return options for line or bar charts', () => {
            expect(service.getDefaultOptions('line')).toEqual(CHART_DEFAULTS.OPTIONS);
            expect(service.getDefaultOptions('bar')).toEqual(CHART_DEFAULTS.OPTIONS);
        });

        fit('Should return options for pie or doughnut charts', () => {
            expect(service.getDefaultOptions('pie')).toEqual(CHART_DEFAULTS.OPTIONS_NOT_LINES);
            expect(service.getDefaultOptions('doughnut')).toEqual(CHART_DEFAULTS.OPTIONS_NOT_LINES);
        });

        fit('Should return options for radar or polarArea charts', () => {
            expect(service.getDefaultOptions('radar')).toEqual(CHART_DEFAULTS.OPTIONS_RADIAL);
            expect(service.getDefaultOptions('polarArea')).toEqual(CHART_DEFAULTS.OPTIONS_RADIAL);
        });
    });

    describe('Get Default Chart Options', () => {
        fit('Should return options for line or bar charts', () => {
            const assertOptions = { legend: true, gridLines: true, xAxe: true, yAxe: true, tooltip: true, ticks: true, defaultColors: true };
            expect(service.getDefaultChartOptions('line')).toEqual(assertOptions);
            expect(service.getDefaultChartOptions('bar')).toEqual(assertOptions);
        });

        fit('Should return options for pie, radar, polarArea or doughnut charts', () => {
            const assertOptions = { legend: true, gridLines: true, xAxe: false, yAxe: false, tooltip: true, ticks: true, defaultColors: true };
            expect(service.getDefaultChartOptions('pie')).toEqual(assertOptions);
            expect(service.getDefaultChartOptions('radar')).toEqual(assertOptions);
            expect(service.getDefaultChartOptions('polarArea')).toEqual(assertOptions);
            expect(service.getDefaultChartOptions('doughnut')).toEqual(assertOptions);
        });
    });

    describe('Set Dataset Styles', () => {
        fit('Should set values for line or bar charts with default colors', () => {
            const datasets: any[] = [{ hoverBackgroundColor: 'test' }, { backgroundColor: 'red' }];

            service.setDatasetStyles('line', datasets);

            datasets.forEach((item, index) => {
                expect(item.backgroundColor).toEqual(CHART_DEFAULTS.COLORS[index].backgroundColor);
                expect(item.hoverBackgroundColor).toEqual(CHART_DEFAULTS.COLORS[index].hoverBackgroundColor);
                expect(item.borderColor).toEqual(CHART_DEFAULTS.COLORS[index].borderColor);
                expect(item.hoverBorderColor).toEqual(CHART_DEFAULTS.COLORS[index].hoverBorderColor);
                expect(item.pointBackgroundColor).toEqual(CHART_DEFAULTS.COLORS[index].pointBackgroundColor);
                expect(item.pointHoverBackgroundColor).toEqual(CHART_DEFAULTS.COLORS[index].pointHoverBackgroundColor);
                expect(item.pointBorderColor).toEqual(CHART_DEFAULTS.COLORS[index].pointBorderColor);
                expect(item.pointHoverBorderColor).toEqual(CHART_DEFAULTS.COLORS[index].pointHoverBorderColor);
            });
        });

        fit('Should set values for line or bar charts with defined colors', () => {
            const datasets: any[] = [{ hoverBackgroundColor: 'test' }, { backgroundColor: 'red' }],
                colors: ChartThemeDataSetColors[] = [{ backgroundColor: 'yellow', hoverBackgroundColor: 'magenta' }];

            service.setDatasetStyles('line', datasets, colors);

            expect(datasets[0].backgroundColor).toEqual('yellow');
            expect(datasets[0].hoverBackgroundColor).toEqual('magenta');
            expect(datasets[1].backgroundColor).toEqual('red');
            expect(datasets[1].hoverBackgroundColor).toBeUndefined();
        });

        fit('Should set values for radar chart with default colors', () => {
            const datasets: any[] = [{ hoverBackgroundColor: 'test' }, { backgroundColor: 'red' }];

            service.setDatasetStyles('radar', datasets);

            datasets.forEach((item, index) => {
                expect(item.backgroundColor).toEqual(CHART_DEFAULTS.HALF_TRANSPARENT_COLORS[index].backgroundColor);
                expect(item.hoverBackgroundColor).toEqual(CHART_DEFAULTS.HALF_TRANSPARENT_COLORS[index].hoverBackgroundColor);
                expect(item.borderColor).toEqual(CHART_DEFAULTS.HALF_TRANSPARENT_COLORS[index].borderColor);
                expect(item.hoverBorderColor).toEqual(CHART_DEFAULTS.HALF_TRANSPARENT_COLORS[index].hoverBorderColor);
                expect(item.pointBackgroundColor).toEqual(CHART_DEFAULTS.HALF_TRANSPARENT_COLORS[index].pointBackgroundColor);
                expect(item.pointHoverBackgroundColor).toEqual(CHART_DEFAULTS.HALF_TRANSPARENT_COLORS[index].pointHoverBackgroundColor);
                expect(item.pointBorderColor).toEqual(CHART_DEFAULTS.HALF_TRANSPARENT_COLORS[index].pointBorderColor);
                expect(item.pointHoverBorderColor).toEqual(CHART_DEFAULTS.HALF_TRANSPARENT_COLORS[index].pointHoverBorderColor);
            });
        });

        fit('Should set values for radar chart with defined colors', () => {
            const datasets: any[] = [{ hoverBackgroundColor: 'test' }, { backgroundColor: 'red' }],
                colors: ChartThemeDataSetColors[] = [{ backgroundColor: 'yellow', hoverBackgroundColor: 'magenta' }];

            service.setDatasetStyles('radar', datasets, colors);

            expect(datasets[0].backgroundColor).toEqual('yellow');
            expect(datasets[0].hoverBackgroundColor).toEqual('magenta');
            expect(datasets[1].backgroundColor).toEqual('red');
            expect(datasets[1].hoverBackgroundColor).toBeUndefined();
        });

        fit('Should set values for polarArea, pie or doughnut charts with default colors', () => {
            const datasets: any[] = [{ hoverBackgroundColor: ['test'] }, { backgroundColor: ['red'] }],
                assertValue = [
                    `rgb(93%, 33%, 40%, 1)`,
                    `rgba(99%, 43%, 32%, 1)`,
                    `rgb(100%, 81%, 33%, 1)`,
                    `rgb(63%, 83%, 41%, 1)`,
                    `rgb(28%, 81%, 68%, 1)`,
                    `rgb(31%, 76%, 91%, 1)`,
                    `rgb(36%, 61%, 93%, 1)`,
                    `rgb(67%, 57%, 93%, 1)`,
                    `rgb(93%, 53%, 75%, 1)`,
                    `rgb(80%, 82%, 85%, 1)`
                ];

            service.setDatasetStyles('polarArea', datasets);

            datasets.forEach(item => {
                expect(item.backgroundColor).toEqual(assertValue);
                expect(item.hoverBackgroundColor).toEqual(assertValue);
            });
        });

        fit('Should set values for polarArea, pie or doughnut charts with defined colors', () => {
            const datasets: any[] = [{ hoverBackgroundColor: ['test', 'test1'] }, { backgroundColor: ['red', 'test1'] }],
                colors: ChartThemeDataSetColors[] = [{ backgroundColor: 'yellow', hoverBackgroundColor: 'magenta' }];

            service.setDatasetStyles('polarArea', datasets, colors);

            expect(datasets[0].backgroundColor).toEqual(['yellow']);
            expect(datasets[0].hoverBackgroundColor).toEqual(['magenta', 'test1']);
            expect(datasets[1].backgroundColor).toEqual(['yellow', 'test1']);
            expect(datasets[1].hoverBackgroundColor).toEqual(['magenta']);
        });
    });
});
