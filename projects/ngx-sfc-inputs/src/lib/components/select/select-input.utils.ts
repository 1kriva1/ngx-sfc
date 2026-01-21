import { isDefined } from "ngx-sfc-common";
import { ISelectValue } from "./models/select-value.model";

export function isSelectValue(value: any): value is ISelectValue {
    if (!isDefined(value)) {
        return false;
    }

    return 'key' in value && 'value' in value;
}