import { Directive, HostBinding, HostListener, Optional } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { isDefined, isNullOrEmptyString } from 'ngx-sfc-common';
import { InputConstants } from '../../constants/input.constants';

@Directive({
  selector: '[sfcInput]'
})
export class InputReferenceDirective {

  isFocused: boolean = false;

  @HostBinding('class')
  class = InputConstants.INPUT_CLASS;

  constructor(@Optional() private ngControl: NgControl) { }

  get value(): any {
    return this.ngControl ? this.ngControl.value : null;
  }

  get hasValue(): boolean {
    return this.ngControl && !isNullOrEmptyString(this.value);
  }

  get isInvalid(): boolean {
    if (this.isDirty) {
      return this.ngControl.invalid || false;
    }

    return this.hasValue && (this.ngControl.invalid || false);
  }

  get isValid(): boolean {
    return this.ngControl.valid || false;
  }

  get isDirty(): boolean {
    return this.ngControl?.dirty || false;
  }

  get errors(): ValidationErrors | null {
    if (this.isInvalid && isDefined(this.ngControl.errors)) {
      return this.ngControl.errors;
    }

    return null;
  }

  @HostListener('focus')
  onFocus(): void {
    this.isFocused = true;
  }

  @HostListener('blur')
  onBlur(): void {
    this.isFocused = false;
  }
}
