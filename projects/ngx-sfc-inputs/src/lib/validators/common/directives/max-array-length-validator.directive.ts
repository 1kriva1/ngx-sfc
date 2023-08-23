import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { maxArrayLength } from '../common.validators';

@Directive({
    selector: '[sfcMaxArrayLength]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: MaxArrayLengthValidatorDirective }
    ]
})
export class MaxArrayLengthValidatorDirective {
    @Input('sfcMaxArrayLength')
    maxArrayLength!: number;

    validate(control: AbstractControl): ValidationErrors | null {
        return maxArrayLength(this.maxArrayLength)(control);
    }
}