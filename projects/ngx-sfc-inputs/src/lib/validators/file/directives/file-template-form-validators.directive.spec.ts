import { Component, DebugElement, ViewChild } from "@angular/core";
import { async, ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule, NgForm, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ButtonComponent, CloseComponent } from "ngx-sfc-common";
import { FileInputComponent } from "../../../components";
import { InputReferenceDirective } from "../../../directives";
import { FileExtensionsValidatorDirective } from "./file-extensions-validator.directive";
import { FileMaxSizeValidatorDirective } from "./file-max-size-validator.directive";
import { FileMinSizeValidatorDirective } from "./file-min-size-validator.directive";

@Component({
    template: `
      <form>
        <sfc-file-input id="file-input" name="file-input" ngModel [sfcFileMaxSize]="1024" [sfcFileMinSize]="256" [sfcFileExtensions]="['jpg', 'jpeg']">
        </sfc-file-input>
      </form>
    `
})
class FileInputFormTemplateTestComponent {
}

describe('Validators-TemplateForm: File', () => {
    let fixture: ComponentFixture<FileInputFormTemplateTestComponent>;
    let el: DebugElement;
    let debugEl: DebugElement;
    let form: NgForm;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, FontAwesomeModule, ReactiveFormsModule],
            declarations: [InputReferenceDirective, ButtonComponent, CloseComponent,
                FileExtensionsValidatorDirective, FileMaxSizeValidatorDirective, FileMinSizeValidatorDirective,
                FileInputComponent, FileInputFormTemplateTestComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(FileInputFormTemplateTestComponent);
            el = fixture.debugElement;
            fixture.detectChanges();

            debugEl = el.query(By.css('input[type=file]'));
            form = el.children[0].injector.get(NgForm);
        });
    }));

    describe('FileMaxSize', () => {
        fit('Should be invalid', (() => {
            const templateFileInputControl = form.control.get('file-input'),
                invalidValue = getHugeFile('testFile.jpg', 2048),
                expectedResult = { requiredSize: 1024, actualSize: 2048, file: invalidValue };

            debugEl.componentInstance.ngControl.control.setValue(invalidValue);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileMaxSize')).toBeTrue();
            expect((templateFileInputControl?.errors as ValidationErrors)['fileMaxSize']).toEqual(expectedResult);
            expect(templateFileInputControl?.valid).toBeFalse();
            expect(form.control.valid).toBeFalse();
        }));

        fit('Should be valid', (() => {
            const templateFileInputControl = form.control.get('file-input'),
                validValue = getHugeFile('testFile.jpg', 512);

            debugEl.componentInstance.ngControl.control.setValue(validValue);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileMaxSize')).toBeFalse();
            expect(templateFileInputControl?.errors).toBeNull();
            expect(templateFileInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));

        fit('Should be valid, because its not a file', (() => {
            const templateFileInputControl = form.control.get('file-input'),
                validValue = { test: 1 };

            debugEl.componentInstance.ngControl.control.setValue(validValue);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileMaxSize')).toBeFalse();
            expect(templateFileInputControl?.errors).toBeNull();
            expect(templateFileInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));

        fit('Should be valid, because value is null', (() => {
            const templateFileInputControl = form.control.get('file-input');
            debugEl.componentInstance.ngControl.control.setValue(null);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileMaxSize')).toBeFalse();
            expect(templateFileInputControl?.errors).toBeNull();
            expect(templateFileInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));
    });

    describe('FileMinSize', () => {
        fit('Should be invalid', (() => {
            const templateFileInputControl = form.control.get('file-input'),
                invalidValue = getHugeFile('testFile.jpg', 128),
                expectedResult = { requiredSize: 256, actualSize: 128, file: invalidValue };

            debugEl.componentInstance.ngControl.control.setValue(invalidValue);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileMinSize')).toBeTrue();
            expect((templateFileInputControl?.errors as ValidationErrors)['fileMinSize']).toEqual(expectedResult);
            expect(templateFileInputControl?.valid).toBeFalse();
            expect(form.control.valid).toBeFalse();
        }));

        fit('Should be valid', (() => {
            const templateFileInputControl = form.control.get('file-input'),
                validValue = getHugeFile('testFile.jpg', 512);

            debugEl.componentInstance.ngControl.control.setValue(validValue);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileMinSize')).toBeFalse();
            expect(templateFileInputControl?.errors).toBeNull();
            expect(templateFileInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));

        fit('Should be valid, because its not a file', (() => {
            const templateFileInputControl = form.control.get('file-input'),
                validValue = { test: 1 };

            debugEl.componentInstance.ngControl.control.setValue(validValue);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileMinSize')).toBeFalse();
            expect(templateFileInputControl?.errors).toBeNull();
            expect(templateFileInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));

        fit('Should be valid, because value is null', (() => {
            const templateFileInputControl = form.control.get('file-input');
            debugEl.componentInstance.ngControl.control.setValue(null);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileMinSize')).toBeFalse();
            expect(templateFileInputControl?.errors).toBeNull();
            expect(templateFileInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));
    });

    describe('FileExtensions', () => {
        fit('Should be invalid', (() => {
            const templateFileInputControl = form.control.get('file-input'),
                allowedExtensions = ["jpg", "jpeg"],
                invalidValue = getHugeFile('testFile.png', 512),
                expectedResult = { allowedExtensions: allowedExtensions, actualExtension: 'png', file: invalidValue };

            debugEl.componentInstance.ngControl.control.setValue(invalidValue);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileExtension')).toBeTrue();
            expect((templateFileInputControl?.errors as ValidationErrors)['fileExtension']).toEqual(expectedResult);
            expect(templateFileInputControl?.valid).toBeFalse();
            expect(form.control.valid).toBeFalse();
        }));

        fit('Should be valid', (() => {
            const templateFileInputControl = form.control.get('file-input'),
                invalidValue = getHugeFile('testFile.jpg', 512);

            debugEl.componentInstance.ngControl.control.setValue(invalidValue);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileExtension')).toBeFalse();
            expect(templateFileInputControl?.errors).toBeNull();
            expect(templateFileInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));

        fit('Should be valid, because its not a file', (() => {
            const templateFileInputControl = form.control.get('file-input'),
                invalidValue = { test: 1 };

            debugEl.componentInstance.ngControl.control.setValue(invalidValue);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileExtension')).toBeFalse();
            expect(templateFileInputControl?.errors).toBeNull();
            expect(templateFileInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));

        fit('Should be valid, because value is null', (() => {
            const templateFileInputControl = form.control.get('file-input'),
                invalidValue = null;

            debugEl.componentInstance.ngControl.control.setValue(invalidValue);
            fixture.detectChanges();

            expect(templateFileInputControl?.hasError('fileExtension')).toBeFalse();
            expect(templateFileInputControl?.errors).toBeNull();
            expect(templateFileInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));
    });
});

function getHugeFile(name: string, size: number): File {
    const file = new File([''], name);
    Object.defineProperty(
        file, 'size', { value: size, writable: false });
    return file;
}