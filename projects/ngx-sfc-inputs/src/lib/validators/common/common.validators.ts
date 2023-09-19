import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isDefined, Compare } from "ngx-sfc-common";
import { validation } from "../_validators";

export function equalOrInclude(includes: any | Array<any>): ValidatorFn {
    const invalidResult = { 'sfc-equal-or-include': true };

    const validatorFn: ValidatorFn = (value: any) => {
        if (!isDefined(value))
            return null;

        if (Array.isArray(includes)) {
            if (includes.length > 0) {
                if (Array.isArray(value)) {
                    for (let index = 0; index < value.length; index++) {
                        const element = value[index],
                            result = equalOrIncludeArrayOfValues(element, includes);

                        if (result) {
                            return result;
                        }
                    }
                } else {
                    return equalOrIncludeArrayOfValues(value, includes);
                }
            }
        } else {
            if (Array.isArray(value)) {
                for (let index = 0; index < value.length; index++) {
                    const element = value[index];

                    if (element instanceof Object) {
                        return JSON.stringify(includes) !== JSON.stringify(element) ? invalidResult : null;
                    } else {
                        return value.includes(includes) ? null : invalidResult;
                    }
                }
            } else {
                if (value instanceof Object) {
                    return JSON.stringify(includes) !== JSON.stringify(value) ? invalidResult : null;
                } else {
                    return value != includes ? invalidResult : null;
                }
            }
        }

        return null;
    };

    return validation(validatorFn);

    function equalOrIncludeArrayOfValues(element: any, includes: Array<any>): ValidationErrors | null {
        if (element instanceof Object) {
            let found: boolean = false;
            for (let index = 0; index < includes.length; index++) {
                const item = includes[index];
                if (JSON.stringify(item) === JSON.stringify(element)) {
                    found = true;
                    break;
                }
            }

            return found ? null : invalidResult;
        } else {
            return includes.includes(element) ? null : invalidResult;
        }
    }
}

export function maxArrayLength(maxLength: number): ValidatorFn {
    const validatorFn = (value: Array<any>) => {
        if (isDefined(value) && value instanceof Array) {
            if (value.length > maxLength) {
                return { 'sfc-max-array-length': { requiredLength: maxLength, actualLength: value.length, value } };
            }
        }

        return null;
    };

    return validation(validatorFn);
}

export function minArrayLength(minLength: number): ValidatorFn {
    const validatorFn = (value: Array<any>) => {
        if (isDefined(value) && value instanceof Array) {
            if (value.length < minLength) {
                return { 'sfc-min-array-length': { requiredLength: minLength, actualLength: value.length, value } };
            }
        }

        return null;
    };

    return validation(validatorFn);
}

export function match(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.parent && reverse) {
            const matchControl = (control.parent?.controls as any)[matchTo] as AbstractControl;

            if (matchControl)
                matchControl.updateValueAndValidity();

            return null;
        }

        return !!control.parent &&
            !!control.parent.value &&
            control.value === (control.parent?.controls as any)[matchTo]?.value
            ? null
            : { 'sfc-match': true };
    }
}

export function compareThan(comparePropertyName: string, compare: Compare, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const comparePropertyValue: any = control.parent?.controls
            ? (control.parent?.controls as any)[comparePropertyName]?.value
            : null;

        if (!isDefined(comparePropertyValue))
            return null;

        if (control.parent && reverse) {
            const matchControl = (control.parent?.controls as any)[comparePropertyName] as AbstractControl;

            if (matchControl)
                matchControl.updateValueAndValidity();

            return null;
        }

        return !!control.parent &&
            !!control.parent.value &&
            comparePropertyValue &&
            (compare == Compare.More
                ? control.value > comparePropertyValue
                : control.value < comparePropertyValue)
            ? null
            : { 'sfc-compare-than': true };
    }
}

