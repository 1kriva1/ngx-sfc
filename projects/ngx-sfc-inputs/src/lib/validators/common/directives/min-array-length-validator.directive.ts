import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { minArrayLength } from '../common.validators';

@Directive({
    selector: '[sfcMinArrayLength]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: MinArrayLengthValidatorDirective }
    ]
})
export class MinArrayLengthValidatorDirective {
    @Input('sfcMinArrayLength')
    minArrayLength!: number;

    validate(control: AbstractControl): ValidationErrors | null {
        return minArrayLength(this.minArrayLength)(control);
    }
}