import { Component, OnInit } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { equalOrInclude, match, maxLength, minLength } from "../common.validators";
import { TagsInputComponent } from "../../../components/tags/tags-input.component";

@Component({
    template: `
        <form [formGroup]="form">
            <sfc-tags-input id="demo-input-field" formControlName="formField"></sfc-tags-input>
            <sfc-tags-input id="demo-input-compare-field" formControlName="compareField"></sfc-tags-input>
        </form>
        `
})
export class CommonReactiveFormValidatorsTestComponent implements OnInit {
    form!: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            formField: [null, [equalOrInclude(['a', 'b', 'c']), maxLength(3), minLength(1), match('compareField')]],
            compareField: [null]
        });
    }
}

describe('Validators-ReactiveForm: Common', () => {
    let component: CommonReactiveFormValidatorsTestComponent;
    let fixture: ComponentFixture<CommonReactiveFormValidatorsTestComponent>;
    let formField: AbstractControl, compareField: AbstractControl;

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
        formField = component.form.controls['formField'];
        compareField = component.form.controls['compareField'];
    });

    describe('EqualOrInclude', () => {
        fit('Should be invalid', () => {
            formField.setValue('d');

            expect((formField.errors as ValidationErrors)['sfcEqualOrInclude']).toBeTrue();
        });

        fit('Should be valid', () => {
            formField.setValue('a');

            expect((formField.errors as ValidationErrors)['sfcEqualOrInclude']).toBeUndefined();
        });
    });

    describe('MaxLength', () => {
        fit('Should be invalid', () => {
            const value = ['a', 'b', 'c', 'd'],
                expectedResult = { requiredLength: 3, actualLength: 4, value: value };

            formField.setValue(value);

            expect((formField.errors as ValidationErrors)['sfcMaxLength']).toEqual(expectedResult);
        });

        fit('Should be valid', () => {
            formField.setValue(['a', 'b', 'c']);

            expect((formField.errors as ValidationErrors)['sfcMaxLength']).toBeUndefined();
        });

        fit('Should be valid, when value is not array', () => {
            formField.setValue('a');

            expect((formField.errors as ValidationErrors)['sfcMaxLength']).toBeUndefined();
        });

        fit('Should be valid, when value is null', () => {
            formField.setValue(null);

            expect(formField.errors).toBeNull();
        });
    });

    describe('MinLength', () => {
        fit('Should be invalid', () => {
            const value: any[] = [],
                expectedResult = { requiredLength: 1, actualLength: 0, value: value };

            formField.setValue(value);

            expect((formField.errors as ValidationErrors)['sfcMinLength']).toEqual(expectedResult);
        });

        fit('Should be valid', () => {
            formField.setValue(['a']);

            expect((formField.errors as ValidationErrors)['sfcMinLength']).toBeUndefined();
        });

        fit('Should be valid, when value is not array', () => {
            formField.setValue('a');

            expect((formField.errors as ValidationErrors)['sfcMinLength']).toBeUndefined();
        });

        fit('Should be valid, when value is null', () => {
            formField.setValue(null);

            expect(formField.errors).toBeNull();
        });
    });

    describe('Match', () => {
        fit('Should be invalid', () => {
            formField.setValue('123');
            compareField.setValue('12');

            expect(component.form.valid).toBeFalsy();
            expect(formField.valid).toBeFalsy();
            expect((formField.errors as ValidationErrors)['sfcMatch']).toBeTrue();
        });

        fit('Should be valid', () => {
            compareField.setValue('123');
            formField.setValue('123');

            expect((formField.errors as ValidationErrors)['sfcMatch']).toBeUndefined();
        });
    });
});