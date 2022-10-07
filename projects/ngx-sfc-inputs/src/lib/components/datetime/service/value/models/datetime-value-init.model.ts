export interface IDateTimeValueInitModel {
    date: boolean;
    time: boolean;
    shortTime: boolean;
    format: string;
    locale: string;
    value: Date;
    disabledDays: Date[];
}