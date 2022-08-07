import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { fileMinSize } from '../../file/file.validators';

@Directive({
    selector: '[sfcFileMinSize]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: FileMinSizeValidatorDirective }
    ]
})
export class FileMinSizeValidatorDirective {
    @Input('sfcFileMinSize') 
    minSize: number = 0;

    validate(control: AbstractControl): ValidationErrors | null {
        return fileMinSize(this.minSize)(control);
    }
}