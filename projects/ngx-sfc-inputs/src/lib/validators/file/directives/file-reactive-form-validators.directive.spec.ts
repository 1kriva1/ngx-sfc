import { Component, OnInit } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { ButtonComponent } from "ngx-sfc-common";
import { FileInputComponent } from "../../../components";
import { fileExtensions, fileMaxSize, fileMinSize } from "../../file/file.validators";

@Component({
    template: `
        <form [formGroup]="form">
            <sfc-file-input id="demo-input-field" formControlName="fileField"></sfc-file-input>
        </form>
        `
})
export class FileReactiveFormValidatorsTestComponent implements OnInit {
    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            fileField: ['', [fileMaxSize(1024), fileMinSize(512), fileExtensions(["jpg", "jpeg"])]]
        });
    }
}

describe('Validators-ReactiveForm: File', () => {
    let component: FileReactiveFormValidatorsTestComponent;
    let fixture: ComponentFixture<FileReactiveFormValidatorsTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [ButtonComponent, FileInputComponent, FileReactiveFormValidatorsTestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileReactiveFormValidatorsTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('FileMaxSize', () => {
        fit('Should be invalid', () => {
            const mockFile = getHugeFile('testFile.jpg', 2048),
                expectedResult = { requiredSize: 1024, actualSize: 2048, file: mockFile },
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeFalsy();
            expect(fileField.valid).toBeFalsy();
            expect((fileField.errors as ValidationErrors)['fileMaxSize']).toEqual(expectedResult);
        });

        fit('Should be valid', () => {
            const mockFile = getHugeFile('testFile.jpg', 512),
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });

        fit('Should be valid, because its not a file', () => {
            const mockFile = { test: 1 },
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });

        fit('Should be valid, because value is null', () => {
            const mockFile = null,
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });
    });

    describe('FileMinSize', () => {
        fit('Should be invalid', () => {
            const mockFile = getHugeFile('testFile.jpg', 256),
                expectedResult = { requiredSize: 512, actualSize: 256, file: mockFile },
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeFalsy();
            expect(fileField.valid).toBeFalsy();
            expect((fileField.errors as ValidationErrors)['fileMinSize']).toEqual(expectedResult);
        });

        fit('Should be valid', () => {
            const mockFile = getHugeFile('testFile.jpg', 1024),
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });

        fit('Should be valid, because its not a file', () => {
            const mockFile = { test: 1 },
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });

        fit('Should be valid, because value is null', () => {
            const mockFile = null,
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });
    });

    describe('FileExtensions', () => {
        fit('Should be invalid', () => {
            const mockFile = getHugeFile('testFile.png', 1024),
                allowedExtensions = ["jpg", "jpeg"],
                expectedResult = { allowedExtensions: allowedExtensions, actualExtension: 'png', file: mockFile },
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeFalsy();
            expect(fileField.valid).toBeFalsy();
            expect((fileField.errors as ValidationErrors)['fileExtension']).toEqual(expectedResult);
        });

        fit('Should be valid', () => {
            const mockFile = getHugeFile('testFile.jpg', 1024),
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });

        fit('Should be valid, because its not a file', () => {
            const mockFile = { test: 1 },
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });

        fit('Should be valid, because value is null', () => {
            const mockFile = null,
                fileField = component.form.controls['fileField'];
            fileField.setValue(mockFile);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });
    });
});

function getHugeFile(name: string, size: number): File {
    const file = new File([''], name);
    Object.defineProperty(
        file, 'size', { value: size, writable: false });
    return file;
}