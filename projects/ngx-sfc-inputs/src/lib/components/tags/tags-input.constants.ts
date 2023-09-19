import { ValidationErrors } from "@angular/forms";
import { isDefined } from "ngx-sfc-common";

export class TagsInputConstants {
  static DEFAULT_NEW_TAG_PLACEHOLDER = '+ Tag';
  static LENGTH_VALIDATOR_KEY = 'sfc-tags-length';
  static LENGTH_VALIDATION(maxLength: number | null, minLength: number | null): ValidationErrors {
    return {
      'sfc-tags-length': isDefined(maxLength) && isDefined(minLength)
        ? `Allowed tag value length is between ${minLength} and ${maxLength} chars`
        : isDefined(maxLength) 
          ? `Max tag value length is ${maxLength} chars`
          : `Min tag value length is ${minLength} chars`
    };
  }
}
