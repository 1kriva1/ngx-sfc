import { Component, OnInit } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { equalOrInclude, maxLength, minLength } from "../common.validators";
import { TagsInputComponent } from "../../../components/tags/tags-input.component";

@Component({
    template: `
        <form [formGroup]="form">
            <sfc-tags-input id="demo-input-field" formControlName="fileField"></sfc-tags-input>
        </form>
        `
})
export class CommonReactiveFormValidatorsTestComponent implements OnInit {
    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            fileField: [null, [equalOrInclude(['a', 'b', 'c']), maxLength(3), minLength(1)]]
        });
    }
}

describe('Validators-ReactiveForm: Common', () => {
    let component: CommonReactiveFormValidatorsTestComponent;
    let fixture: ComponentFixture<CommonReactiveFormValidatorsTestComponent>;
    let fileField: AbstractControl;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [TagsInputComponent, CommonReactiveFormValidatorsTestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommonReactiveFormValidatorsTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        fileField = component.form.controls['fileField'];
    });

    describe('EqualOrInclude', () => {
        fit('Should be invalid', () => {
            fileField.setValue('d');

            expect(component.form.valid).toBeFalsy();
            expect(fileField.valid).toBeFalsy();
            expect((fileField.errors as ValidationErrors)['sfcEqualOrInclude']).toBeTrue();
        });

        fit('Should be valid', () => {
            fileField.setValue('a');

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });
    });

    describe('MaxLength', () => {
        fit('Should be invalid', () => {
            const value = ['a', 'b', 'c', 'd'],
                expectedResult = { requiredLength: 3, actualLength: 4, value: value };

            fileField.setValue(value);

            expect(component.form.valid).toBeFalsy();
            expect(fileField.valid).toBeFalsy();
            expect((fileField.errors as ValidationErrors)['sfcMaxLength']).toEqual(expectedResult);
        });

        fit('Should be valid', () => {
            fileField.setValue(['a', 'b', 'c']);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });

        fit('Should be valid, when value is not array', () => {
            fileField.setValue('a');

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });

        fit('Should be valid, when value is null', () => {
            fileField.setValue(null);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });
    });

    describe('MinLength', () => {
        fit('Should be invalid', () => {
            const value: any[] = [],
                expectedResult = { requiredLength: 1, actualLength: 0, value: value };

            fileField.setValue(value);

            expect(component.form.valid).toBeFalsy();
            expect(fileField.valid).toBeFalsy();
            expect((fileField.errors as ValidationErrors)['sfcMinLength']).toEqual(expectedResult);
        });

        fit('Should be valid', () => {
            fileField.setValue(['a']);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });

        fit('Should be valid, when value is not array', () => {
            fileField.setValue('a');

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });

        fit('Should be valid, when value is null', () => {
            fileField.setValue(null);

            expect(component.form.valid).toBeTruthy();
            expect(fileField.valid).toBeTruthy();
            expect(fileField.errors).toBeNull();
        });
    });
});