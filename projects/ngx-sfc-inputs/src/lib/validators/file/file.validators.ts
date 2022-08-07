import { ValidatorFn } from "@angular/forms";
import { any, getFileExtension } from "ngx-sfc-common";
import { validation } from "../_validators";

export function fileMaxSize(maxSize: number): ValidatorFn {
    const validatorFn = (file: File) => {
        if (file instanceof File && file.size > maxSize) {
            return { fileMaxSize: { requiredSize: maxSize, actualSize: file.size, file } };
        }

        return null;
    };
    return validation(validatorFn);
}

export function fileMinSize(minSize: number): ValidatorFn {
    const validatorFn = (file: File) => {
        if (file instanceof File && file.size < minSize) {
            return { fileMinSize: { requiredSize: minSize, actualSize: file.size, file } };
        }

        return null;
    };
    return validation(validatorFn);
}

export function fileExtensions(allowedExtensions: Array<string>): ValidatorFn {
    const validatorFn = (file: File) => {
        if (!any(allowedExtensions)) {
            return null;
        }

        if (file instanceof File) {
            const ext = getFileExtension(file);
            if (allowedExtensions.indexOf(ext) === -1) {
                return { fileExtension: { allowedExtensions: allowedExtensions, actualExtension: ext, file } };
            }
        }

        return null;
    };
    return validation(validatorFn);
}