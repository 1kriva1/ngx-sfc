export interface IInnerValidation {
    key: string;
    validate: (value: any | null, parameters: any) => boolean;
}