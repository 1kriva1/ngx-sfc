export interface IClockModel {
    hours: IHour[],
    minutes: IMinute[]
    viewBox?: string;
    translate?: string;
}

// HOURS
export interface IHour {
    value: number;
    circle: IHourCircle;
    text: IHourText;
}

export interface IHourCircle {
    cx: number;
    cy: number;
}

export interface IHourText {
    x: number;
    y: number;
}
// END HOURS

// MINUTES
export interface IMinute {
    value: number;
    circle: IMinuteCircle;
    text: IMinuteText | null;
}

export interface IMinuteCircle {
    cx: number;
    cy: number;
    r: number;
}

export interface IMinuteText {
    x: number;
    y: number;
}
// END MINUTES