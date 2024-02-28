import { HttpParams } from "@angular/common/http";
import { CommonConstants } from "../constants";
import { isDefined } from "./common.utils";

/**
 * Build HTTP parameters (GET) from request object
 * @param value Request object
 *  * @returns HTTP parameters
 */
export function buildHttpParams(value: any): HttpParams {
    let params: any = {}, httpParams = new HttpParams();

    _build(params, value, CommonConstants.EMPTY_STRING);

    Object.keys(params).forEach(key => httpParams = httpParams.append(key, params[key]));

    return httpParams;

    function _build(params: any, value: any, path: string, isArray: boolean = false) {
        const ARRAY_PART: string = ']';
        Object.keys(value).forEach(key => {
            if (value[key] instanceof Array) {
                _build(params, value[key], `${path}${key}[`, true);
            } else if (value[key] instanceof Object) {
                _build(params, value[key], `${path}${key}${isArray ? `${ARRAY_PART}${CommonConstants.DOT}` : CommonConstants.DOT}`);
            } else {
                if (isDefined(value[key]))
                    params[`${path}${key}${isArray ? ARRAY_PART : CommonConstants.EMPTY_STRING}`] = value[key];
            }
        });
    }
}