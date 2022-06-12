import { Directive } from "@angular/core";
import { ChartConfiguration } from "chart.js";
import { BaseChartPresentationComponent } from "./base-chart-presentations.component";

@Directive({})
export class BaseChartTwoPresentationComponent extends BaseChartPresentationComponent {

    public labels: string[] = ['Series A', 'Series B', 'Series C'];

    public dataSets: ChartConfiguration['data']['datasets'] = [
        {
            data: [350, 450, 100],
            label: "Series A"
        },
        {
            data: [50, 150, 120],
            label: "Series B"
        },
        {
            data: [250, 130, 70],
            label: "Series С"
        }
    ];

    public duoChartData: ChartConfiguration['data'] = {
        labels: this.labels,
        datasets: [
            { data: [350, 450, 100], label: 'Series A' },
            { data: [50, 150, 120], label: 'Series B' }
        ]
    }

    public allDefaultColorsChartData: ChartConfiguration['data'] = {
        labels: ['Series A', 'Series B', 'Series C', 'Series D', 'Series E', 'Series F', 'Series G', 'Series H', 'Series J', 'Series K'],
        datasets: [
            { data: [65, 59, 80, 81, 56, 55, 40, 11, 23, 76], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90, 56, 12, 12], label: 'Series B' },
            { data: [65, 39, 10, 41, 76, 55, 70, 87, 54, 15], label: 'Series C' }
        ]
    }

    public customColorsChartData: ChartConfiguration['data'] = {
        labels: this.labels,
        datasets: [
            { data: [350, 450, 100], label: 'Series A', backgroundColor: ['magenta', 'yellow', 'pink'] }
        ]
    }

    public changableChartData: ChartConfiguration['data'] = {
        labels: this.labels,
        datasets: [{ data: [350, 450, 100], label: 'Series A' }]
    }    

    public getData() {
        return {
            labels: this.labels,
            datasets: [
                {
                    data: [350, 450, 100],
                    label: "Series A"
                }
            ]
        }
    }

    public changeDataSets(chart: any) {
        this.changableChartData.datasets[0].data = [
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100),
            Math.round(Math.random() * 100)
        ];

        chart.update();
    }
}