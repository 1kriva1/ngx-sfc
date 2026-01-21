import { isDefined } from "ngx-sfc-common";
import { IRangeLimitValueModel } from "./models/range-limit-value.model";

export function isRangeLimitValue(value: any): value is IRangeLimitValueModel {
    if (!isDefined(value)) {
        return false;
    }

    return 'from' in value && 'to' in value;
}