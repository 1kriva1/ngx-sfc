import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { minLength } from '../common.validators';

@Directive({
    selector: '[sfcMinLength]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: MinLengthValidatorDirective }
    ]
})
export class MinLengthValidatorDirective {
    @Input('sfcMinLength')
    minLength!: number;

    validate(control: AbstractControl): ValidationErrors | null {
        return minLength(this.minLength)(control);
    }
}