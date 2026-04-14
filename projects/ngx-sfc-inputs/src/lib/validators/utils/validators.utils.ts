import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { empty } from "ngx-sfc-common";
import { Subscription } from "rxjs";

export function addConditionalValidator(
    form: FormGroup,
    targetField: string,
    conditionField: string,
    condition: (value: any) => boolean,
    validators: ValidatorFn[]
): Subscription | empty {
    const targetControl: AbstractControl | empty = form.get(targetField),
        conditionControl: AbstractControl | empty = form.get(conditionField);

    if (!targetControl || !conditionControl) {
        return;
    }

    const requiredValidators: ValidatorFn[] = validators.map(validator => (control: AbstractControl): ValidationErrors | null => {
        if (!condition(conditionControl.value)) {
            return null;
        }

        return validator(control);
    });

    if (requiredValidators.length) {
        targetControl.setValidators(requiredValidators);
    }

    return conditionControl.valueChanges.subscribe(() => targetControl.updateValueAndValidity());
}