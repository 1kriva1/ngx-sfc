import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isDefined } from "ngx-sfc-common";
import { validation } from "../_validators";

export function equalOrInclude(includes: any | Array<any>): ValidatorFn {
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
                        return JSON.stringify(includes) !== JSON.stringify(element) ? { sfcEqualOrInclude: true } : null;
                    } else {
                        return value.includes(includes) ? null : { sfcEqualOrInclude: true };
                    }
                }
            } else {
                if (value instanceof Object) {
                    return JSON.stringify(includes) !== JSON.stringify(value) ? { sfcEqualOrInclude: true } : null;
                } else {
                    return value != includes ? { sfcEqualOrInclude: true } : null;
                }
            }
        }

        return null;
    };

    return validation(validatorFn);
}

export function maxLength(maxLength: number): ValidatorFn {
    const validatorFn = (value: Array<any>) => {
        if (isDefined(value) && value instanceof Array) {
            if (value.length > maxLength) {
                return { sfcMaxLength: { requiredLength: maxLength, actualLength: value.length, value } };
            }
        }

        return null;
    };

    return validation(validatorFn);
}

export function minLength(minLength: number): ValidatorFn {
    const validatorFn = (value: Array<any>) => {
        if (isDefined(value) && value instanceof Array) {
            if (value.length < minLength) {
                return { sfcMinLength: { requiredLength: minLength, actualLength: value.length, value } };
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
            : { sfcMatch: true };
    }
}

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

        return found ? null : { sfcEqualOrInclude: true };
    } else {
        return includes.includes(element) ? null : { sfcEqualOrInclude: true };
    }
}