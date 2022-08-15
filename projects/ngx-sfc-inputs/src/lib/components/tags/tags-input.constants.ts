import { hasItem, isNullOrEmptyString } from "ngx-sfc-common";
import { ValidationConstants } from "../../constants/validation.constants";
import { IInnerValidation } from "../../validators/inner-validation.model";

export class TagsInputConstants {
    static DEFAULT_NEW_TAG_PLACEHOLDER = '+ Tag';
    static INNER_VALIDATIONS: IInnerValidation[] = [
        {
          key: ValidationConstants.DUPLICATE_VALIDATOR_KEY,
          validate: (value: any | null, newValue: string) => !hasItem(value as string[], newValue)
        },
        {
          key: ValidationConstants.EMPTY_VALIDATOR_KEY,
          validate: (value: any | null, newValue: string) => !isNullOrEmptyString(newValue)
        }
      ]
}
