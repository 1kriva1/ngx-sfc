import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { compareThan } from '../common.validators';
import { Compare } from 'ngx-sfc-common';

@Directive({
    selector: '[sfcCompareThan]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: CompareThanValidatorDirective }
    ]
})
export class CompareThanValidatorDirective {
    @Input('sfcCompareThan')
    comparePropertyName!: string;

    @Input()
    compare!: Compare;

    validate(control: AbstractControl): ValidationErrors | null {
        return compareThan(this.comparePropertyName, this.compare)(control);
    }
}