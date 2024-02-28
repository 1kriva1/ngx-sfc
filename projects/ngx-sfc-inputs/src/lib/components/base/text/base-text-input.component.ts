import { Directive, Input } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { BaseInputComponent } from '../base-input.component';
import { ValidationConstants } from '../../../constants/validation.constants';

@Directive()
export abstract class BaseTextInputComponent<T extends string | string[]> extends BaseInputComponent<T> {

    @Input()
    showPlaceholderOnFocus: boolean = false;

    override get placeholderValue(): string {
        return this.placeholder && (!this.isFocused || this.showPlaceholderOnFocus)
            ? this.placeholder
            : CommonConstants.EMPTY_STRING;
    }

    get requiredLengthValue(): number | null {
        let requiredLength = null;

        if (this.validationErrors) {
            const minLengthError = this.validationErrors[ValidationConstants.MIN_LENGTH_VALIDATOR_KEY],
                maxLengthError = this.validationErrors[ValidationConstants.MAX_LENGTH_VALIDATOR_KEY];

            if (minLengthError) {
                requiredLength = minLengthError.requiredLength;
            }

            if (maxLengthError) {
                requiredLength = maxLengthError.requiredLength;
            }
        }

        return requiredLength;
    }

    get charsCounterValue(): string {
        return this.requiredLengthValue
            ? `${this.value?.length}${CommonConstants.COMMON_TEXT_DELIMETER}${this.requiredLengthValue}`
            : CommonConstants.EMPTY_STRING;
    }
}