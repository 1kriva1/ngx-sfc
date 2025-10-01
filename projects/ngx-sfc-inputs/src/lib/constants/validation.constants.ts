import { ValidationErrors } from "@angular/forms";
import { CommonValidator } from "../validators";

export class ValidationConstants {
    // keys
    static EQUAL_OR_INCLUDE_VALIDATOR_KEY = 'sfc-equal-or-include';
    static MAX_ARRAY_LENGTH_VALIDATOR_KEY = 'sfc-max-array-length';
    static MIN_ARRAY_LENGTH_VALIDATOR_KEY = 'sfc-min-array-length';
    static MATCH_VALIDATOR_KEY = 'sfc-match';
    static COMPARE_THAN_VALIDATOR_KEY = 'sfc-compare-than';

    // validations
    static DUPLICATE_VALIDATION: ValidationErrors = { [CommonValidator.Duplicate]: 'Duplicate value' };
    static EMPTY_VALIDATION: ValidationErrors = { [CommonValidator.Empty]: 'Empty value' };
    static FORMAT_VALIDATION: ValidationErrors = { [CommonValidator.Format]: 'Invalid file format' };
    static DATA_VALIDATION: ValidationErrors = { [CommonValidator.Data]: 'Data error occurred' };
}