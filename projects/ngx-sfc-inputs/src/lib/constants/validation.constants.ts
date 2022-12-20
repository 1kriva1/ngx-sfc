import { ValidationErrors } from "@angular/forms";

export class ValidationConstants {
    // keys
    static MIN_LENGTH_VALIDATOR_KEY = 'minlength';
    static MAX_LENGTH_VALIDATOR_KEY = 'maxlength';
    static DUPLICATE_VALIDATOR_KEY = 'sfc-duplicate';
    static EMPTY_VALIDATOR_KEY = 'sfc-empty';
    static FORMAT_VALIDATOR_KEY = 'sfc-format';
    static DATA_VALIDATOR_KEY = 'sfc-data';

    // validations
    static DUPLICATE_VALIDATION: ValidationErrors = { 'sfc-duplicate': 'Duplicate value' };
    static EMPTY_VALIDATION: ValidationErrors = { 'sfc-empty': 'Empty value' };
    static FORMAT_VALIDATION: ValidationErrors = { 'sfc-format': 'Invalid file format' };
    static DATA_VALIDATION: ValidationErrors = { 'sfc-data': 'Data error occurred' };
}