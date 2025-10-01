import { ValidatorFn } from "@angular/forms";
import { any, getFileExtension } from "ngx-sfc-common";
import { validation } from "../_validators";
import { FileValidator } from "./enums/file-validator.enum";
import { IFileExtensionValidationModel } from "./models/file-extension-validation.model";
import { IFileSizeValidationModel } from "./models/file-size-validation.model";

export function fileMaxSize(maxSize: number): ValidatorFn {
    const validatorFn = (file: File) => {
        if (file instanceof File && file.size > maxSize) {
            const model: IFileSizeValidationModel = { requiredSize: maxSize, actualSize: file.size, file };
            return { [FileValidator.MaxSize]: model };
        }

        return null;
    };

    return validation(validatorFn);
}

export function fileMinSize(minSize: number): ValidatorFn {
    const validatorFn = (file: File) => {
        if (file instanceof File && file.size < minSize) {
            const model: IFileSizeValidationModel = { requiredSize: minSize, actualSize: file.size, file };
            return { [FileValidator.MinSize]: model };
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
                const model: IFileExtensionValidationModel = { allowedExtensions: allowedExtensions, actualExtension: ext, file };
                return { [FileValidator.Extension]: model };
            }
        }

        return null;
    };

    return validation(validatorFn);
}