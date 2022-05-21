import { Directive } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ChartConfiguration, ChartType } from "chart.js";
import { ChartOptionModel, ChartThemeModel, ChartThemeService } from "ngx-sfc-components";
import { BasePresentationComponent } from "../../base-presentations.component";

@Directive()
export abstract class BaseChartPresentationComponent extends BasePresentationComponent {

    public chartType: ChartType = 'line';

    private themeInnerToggler: number = 0;

    constructor(protected override router: Router,
        protected override activatedRoute: ActivatedRoute,
        private themeService: ChartThemeService) {
        super(router, activatedRoute);
    }

    public chartOptions: ChartOptionModel = { legend: false, gridLines: false, xAxe: false, yAxe: false, tooltip: false, ticks: false, defaultColors: false };

    public plugins: any = [
        {
            beforeDraw: (chart: any) => {
                const { chartStyles = {} } = chart.config.options;
                if (chartStyles) {
                    const { ctx } = chart;
                    const { chartArea: area } = chart;

                    ctx.save();
                    ctx.fillStyle = 'grey';
                    ctx.fillRect(area.left, area.top, area.right - area.left, area.bottom - area.top);
                    ctx.restore();
                }
            }
        }
    ];

    public legendLeftChartOptions: ChartConfiguration['options'] = {
        plugins: {
            legend: {
                position: 'left'
            },
            title: {
                display: true,
                text: 'Custom options (legend left)',
                padding: 0
            }
        }
    }

    public verticalChartOptions: ChartConfiguration['options'] = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'left'
            },
            title: {
                display: true,
                text: 'Custom options (vertical chart)',
                padding: 0
            }
        }
    }

    public toggleTheme() {
        this.themeInnerToggler = this.themeInnerToggler > 0 ? 0 : 1;

        const gridColor0 = '#FCBB42', ticksColor0 = '#8CC152', gridColor1 = '#967ADC', ticksColor1 = '#4A89DC',
            gridColor = this.themeInnerToggler ? gridColor1 : gridColor0,
            ticksColor = this.themeInnerToggler ? ticksColor1 : ticksColor0;

        let colors: ChartThemeModel = {};

        switch (this.chartType) {
            case 'polarArea':
            case 'pie':
            case 'doughnut':
                colors = this.getDoughnutColors(gridColor, ticksColor);
                break;
            default:
                colors = this.getDefaultColors(gridColor, ticksColor);
                break;
        }

        this.themeService.setColors(colors);
    }

    public getTitleOptions(title: string) {
        return {
            plugins: {
                title: {
                    display: true,
                    text: title,
                    padding: 0
                }
            }
        }
    }

    private getDefaultColors(gridColor: string, ticksColor: string) {
        return {
            options: {
                scales: {
                    x: {
                        grid: { color: gridColor },
                        ticks: { color: ticksColor }
                    },
                    y: {
                        grid: { color: gridColor },
                        ticks: { color: ticksColor }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: ticksColor }
                    }
                }
            },
            dataSetColors: [
                {
                    borderColor: gridColor,
                    backgroundColor: ticksColor,
                    pointBackgroundColor: ticksColor,
                    pointBorderColor: gridColor
                }
            ]
        };
    }

    private getDoughnutColors(backgroundColor: string, ticksColor: string) {
        return {
            options: {
                plugins: {
                    legend: {
                        labels: { color: ticksColor }
                    }
                }
            },
            dataSetColors: [
                {
                    backgroundColor: backgroundColor,
                }
            ]
        };
    }
}