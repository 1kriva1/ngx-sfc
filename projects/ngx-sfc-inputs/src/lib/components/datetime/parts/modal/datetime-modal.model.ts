export interface IDateTimeModalModel {
    value: Date;
    hour: number;
    minute: number;
    day: string;
    dayNumber: number;
    month: string;
    year: string;
    yearNumber: number;
    time: string;
}

export interface IDateTimeModalButtonsModel {
    okLabel?: string;
    cancelLabel?: string;
    nowLabel?: string;
    clearLabel?: string;
}
