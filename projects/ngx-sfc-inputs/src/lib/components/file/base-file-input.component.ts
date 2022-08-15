import { Directive, ElementRef, HostListener, Input, ViewChild } from "@angular/core";
import { CommonConstants, isNullOrEmptyString } from "ngx-sfc-common";
import { BaseInputComponent } from "../base/base-input.component";
import { FileInputConstants } from "./file-input.constants";

@Directive()
export abstract class BaseFileInputComponent extends BaseInputComponent<File> {

    @Input()
    clear = true;

    @ViewChild('inputFile', { static: false, read: ElementRef })
    fileElementRef!: ElementRef;

    @HostListener('change', ['$event.target.files'])
    emitFiles(event: FileList) {
        const file = event && event.item(0);
        this.onChange(file);
    }

    get fileName(): string {
        return this.value ? this.value.name : CommonConstants.EMPTY_STRING;
    }

    get title(): string {
        return isNullOrEmptyString(this.fileName) ? FileInputConstants.NO_FILE_TITLE : this.fileName;
    }

    get showClearButton(): boolean {
        return this.hasValue && this.clear;
    }

    clearData(event: Event): void {
        event.preventDefault();
        this.fileElementRef.nativeElement.value = null;
        this.onChange(null);
    }
}
