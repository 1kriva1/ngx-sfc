import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { maxLength } from '../common.validators';

@Directive({
    selector: '[sfcMaxLength]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: MaxLengthValidatorDirective }
    ]
})
export class MaxLengthValidatorDirective {
    @Input('sfcMaxLength')
    maxLength!: number;

    validate(control: AbstractControl): ValidationErrors | null {
        return maxLength(this.maxLength)(control);
    }
}