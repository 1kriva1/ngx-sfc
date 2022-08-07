import { NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { fileExtensions } from '../file.validators';

@Directive({
    selector: '[sfcFileExtensions]',
    providers: [
        { provide: NG_VALIDATORS, multi: true, useExisting: FileExtensionsValidatorDirective }
    ]
})
export class FileExtensionsValidatorDirective {
    @Input('sfcFileExtensions')
    extensions: string[] = [];

    validate(control: AbstractControl): ValidationErrors | null {
        return fileExtensions(this.extensions)(control);
    }
}