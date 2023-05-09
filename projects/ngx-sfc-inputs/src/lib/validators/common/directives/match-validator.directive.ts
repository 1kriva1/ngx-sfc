import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { match } from '../common.validators';

@Directive({
    selector: '[sfcMatch]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: MatchValidatorDirective }
    ]
})
export class MatchValidatorDirective {
    @Input('sfcMatch')
    matchTo!: string;

    @Input()
    reverse: boolean = false;

    validate(control: AbstractControl): ValidationErrors | null {
        return match(this.matchTo, this.reverse)(control);
    }
}