import { Directive } from "@angular/core";
import { ChartConfiguration } from "chart.js";
import { ChartComponent } from "ngx-sfc-components";
import { BaseChartPresentationComponent } from "./base-chart-presentations.component";

@Directive({})
export class BaseChartOnePresentationComponent extends BaseChartPresentationComponent {

    public labels: string[] = ["January", "February", "March", "April", "May", "June", "July"];

    public dataSets: ChartConfiguration['data']['datasets'] = [
        {
            data: [65, 59, 80, 81, 56, 55, 40],
            label: "Series A"
        },
        {
            data: [45, 19, 30, 61, 96, 75, 50],
            label: "Series B"
        },
        {
            data: [65, 39, 10, 41, 76, 55, 70],
            label: "Series С"
        },
    ]

    public duoChartData: ChartConfiguration['data'] = {
        labels: this.labels,
        datasets: [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                label: "Series A",
                tension: 0.2
            },
            {
                data: [45, 19, 30, 61, 96, 75, 50],
                label: "Series B",
                tension: 0.2
            }
        ]
    }

    public changableChartData: ChartConfiguration['data'] = {
        labels: this.labels,
        datasets: [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                label: "Series A"
            }
        ]
    }

    public allDefaultColorsChartData: ChartConfiguration['data'] = {
        labels: this.labels,
        datasets: [
            { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
            { data: [45, 19, 30, 61, 96, 75, 50], label: "Series B" },
            { data: [65, 39, 10, 41, 76, 55, 70], label: "Series С" },
            { data: [95, 9, 40, 11, 46, 85, 100], label: "Series D" },
            { data: [85, 19, 50, 21, 36, 75, 90], label: "Series E" },
            { data: [75, 29, 60, 31, 46, 65, 80], label: "Series F" },
            { data: [35, 69, 20, 71, 6, 25, 40], label: "Series G" },
            { data: [15, 49, 40, 51, 26, 5, 20], label: "Series H" },
            { data: [65, 9, 90, 1, 76, 55, 70], label: "Series J" },
            { data: [35, 39, 60, 31, 46, 25, 40], label: "Series K" }
        ]
    }    

    public customColorsChartData: ChartConfiguration['data'] = {
        labels: this.labels,
        datasets: [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                label: "Series A",
                borderColor: 'blue',
                backgroundColor: 'yellow',
                pointBackgroundColor: 'magenta',
                pointBorderColor: 'white'
            }
        ]
    }    

    public getData() {
        return {
            labels: this.labels,
            datasets: [
                {
                    data: [65, 59, 80, 81, 56, 55, 40],
                    label: "Series A"
                }
            ]
        }
    }

    public changeDataSets(chart: ChartComponent) {
        this.changableChartData.datasets[0].data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.round(Math.random() * 100),
            56,
            Math.round(Math.random() * 100),
            40];

        chart.update();
    }
}