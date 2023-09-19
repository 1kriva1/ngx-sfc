import { ValidationErrors } from "@angular/forms";

export class ValidationConstants {
    // keys
    static MIN_LENGTH_VALIDATOR_KEY = 'minlength';
    static MAX_LENGTH_VALIDATOR_KEY = 'maxlength';
    static DUPLICATE_VALIDATOR_KEY = 'sfc-duplicate';
    static EMPTY_VALIDATOR_KEY = 'sfc-empty';
    static FORMAT_VALIDATOR_KEY = 'sfc-format';
    static DATA_VALIDATOR_KEY = 'sfc-data';
    static EQUAL_OR_INCLUDE_VALIDATOR_KEY = 'sfc-equal-or-include';
    static MAX_ARRAY_LENGTH_VALIDATOR_KEY = 'sfc-max-array-length';
    static MIN_ARRAY_LENGTH_VALIDATOR_KEY = 'sfc-min-array-length';
    static MATCH_VALIDATOR_KEY = 'sfc-match';
    static COMPARE_THAN_VALIDATOR_KEY = 'sfc-compare-than';
    
    // validations
    static DUPLICATE_VALIDATION: ValidationErrors = { 'sfc-duplicate': 'Duplicate value' };
    static EMPTY_VALIDATION: ValidationErrors = { 'sfc-empty': 'Empty value' };
    static FORMAT_VALIDATION: ValidationErrors = { 'sfc-format': 'Invalid file format' };
    static DATA_VALIDATION: ValidationErrors = { 'sfc-data': 'Data error occurred' };    
}