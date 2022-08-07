import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { fileMaxSize } from '../../file/file.validators';

@Directive({
    selector: '[sfcFileMaxSize]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: FileMaxSizeValidatorDirective }
    ]
})
export class FileMaxSizeValidatorDirective {
    @Input('sfcFileMaxSize')
    maxSize: number = 0;

    validate(control: AbstractControl):  ValidationErrors | null {
        return fileMaxSize(this.maxSize)(control);
    }
}