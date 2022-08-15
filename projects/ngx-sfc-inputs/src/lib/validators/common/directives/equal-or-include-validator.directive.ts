import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { equalOrInclude } from '../common.validators';

@Directive({
    selector: '[sfcEqualOrInclude]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: EqualOrIncludeValidatorDirective }
    ]
})
export class EqualOrIncludeValidatorDirective {
    @Input('sfcEqualOrInclude')
    includes: any | Array<any>;

    validate(control: AbstractControl): ValidationErrors | null {
        return equalOrInclude(this.includes)(control);
    }
}