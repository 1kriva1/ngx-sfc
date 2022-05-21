import { ChartConfiguration } from "chart.js";
import { UIConstants, replaceRgbOpacity } from "ngx-sfc-common";
import { ChartThemeDataSetColors } from "./service/theme/chart-theme.model";

const DEFAULT_BACKGROUND_COLORS = [
    `rgb(93%, 33%, 40%, ${UIConstants.RGB_OPACITY_PLACEHOLDER})`,
    `rgba(99%, 43%, 32%, ${UIConstants.RGB_OPACITY_PLACEHOLDER})`,
    `rgb(100%, 81%, 33%, ${UIConstants.RGB_OPACITY_PLACEHOLDER})`,
    `rgb(63%, 83%, 41%, ${UIConstants.RGB_OPACITY_PLACEHOLDER})`,
    `rgb(28%, 81%, 68%, ${UIConstants.RGB_OPACITY_PLACEHOLDER})`,
    `rgb(31%, 76%, 91%, ${UIConstants.RGB_OPACITY_PLACEHOLDER})`,
    `rgb(36%, 61%, 93%, ${UIConstants.RGB_OPACITY_PLACEHOLDER})`,
    `rgb(67%, 57%, 93%, ${UIConstants.RGB_OPACITY_PLACEHOLDER})`,
    `rgb(93%, 53%, 75%, ${UIConstants.RGB_OPACITY_PLACEHOLDER})`,
    `rgb(80%, 82%, 85%, ${UIConstants.RGB_OPACITY_PLACEHOLDER})`
];

const DEFAULT_BORDER_COLORS = ['#DA4453', '#E9573F', '#FCBB42', '#8CC152', '#37BC9B', '#3BAFDA', '#4A89DC', '#967ADC', '#D770AD', '#AAB2BD'];

const DEFAULT_MODE_COLORS = { GRID: 'rgba(0,0,0,0.1)', TICKS: '#666' };

const DARK_MODE_COLORS = { GRID: '#656D78', TICKS: '#E6E9ED' };

export const CHART_DEFAULTS = {
    OPTIONS: _getOptions(),
    OPTIONS_NOT_LINES: _getOptions(false),
    OPTIONS_RADIAL: _getOptions(false, true),
    COLORS: _getColors(),
    HALF_TRANSPARENT_COLORS: _getColors(0.5),
    THEME: {
        DEFAULT: _getThemeOptions(false),
        DARK: _getThemeOptions(true)
    }
}

function _getOptions(showAxes: boolean = true, showRadialAxes: boolean = false): ChartConfiguration['options'] {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: showAxes,
                grid: { display: true },
                ticks: { display: true }
            },
            y: {
                display: showAxes,
                grid: { display: true },
                ticks: { display: true }
            },
            r: {
                display: showRadialAxes,
            }
        },
        plugins: {
            tooltip: { enabled: true },
            legend: { display: true }
        }
    };
}

function _getColors(opacity: number = 1): ChartThemeDataSetColors[] {
    const backgrounds = DEFAULT_BACKGROUND_COLORS.map(b => replaceRgbOpacity(b, opacity));

    return backgrounds.map((background: string, index: number) => {
        const border = DEFAULT_BORDER_COLORS[index];
        return {
            backgroundColor: background,
            hoverBackgroundColor: background,
            borderColor: border,
            pointBackgroundColor: background,
            pointBorderColor: border
        }
    });
}

function _getThemeOptions(dark: boolean) {
    const grid = dark ? DARK_MODE_COLORS.GRID : DEFAULT_MODE_COLORS.GRID,
        ticks = dark ? DARK_MODE_COLORS.TICKS : DEFAULT_MODE_COLORS.TICKS;
    return {
        scales: {
            x: {
                grid: { color: grid },
                ticks: { color: ticks }

            },
            y: {
                grid: { color: grid },
                ticks: { color: ticks }
            },
            r: {
                angleLines: { color: grid },
                grid: { color: grid },
                ticks: { color: ticks, backdropColor: 'transparent' },
                pointLabels: { color: ticks }
            }
        },
        plugins: {
            legend: {
                labels: { color: ticks }
            },
            title: {
                color: ticks
            }
        }
    }
}