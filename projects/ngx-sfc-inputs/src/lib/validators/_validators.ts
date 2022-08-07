import { AbstractControl, ValidatorFn } from "@angular/forms";
import { isDefined } from "ngx-sfc-common";

export function validation(validatorFn: (arg: any) => null | object): ValidatorFn {
    const validator: ValidatorFn = (formControl: AbstractControl) => {
        return isDefined(formControl) ? validatorFn(formControl.value) : null;
    };

    return validator;
}