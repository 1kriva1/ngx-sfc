import { Component, OnInit } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { compareThan, equalOrInclude, match, maxArrayLength, minArrayLength } from "../common.validators";
import { TagsInputComponent } from "../../../components/tags/tags-input.component";
import { ValidationConstants } from "../../../constants/validation.constants";
import { Compare, ShowHideElementDirective } from "ngx-sfc-common";

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
            formField: [null, [
                equalOrInclude(['a', 'b', 'c']),
                maxArrayLength(3),
                minArrayLength(1),
                match('compareField')
            ]],
            compareField: [null, [compareThan('formField', Compare.More)]]
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
            declarations: [ShowHideElementDirective, TagsInputComponent, CommonReactiveFormValidatorsTestComponent]
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

            expect((formField.errors as ValidationErrors)[ValidationConstants.EQUAL_OR_INCLUDE_VALIDATOR_KEY]).toBeTrue();
        });

        fit('Should be valid', () => {
            formField.setValue('a');

            expect((formField.errors as ValidationErrors)[ValidationConstants.EQUAL_OR_INCLUDE_VALIDATOR_KEY]).toBeUndefined();
        });
    });

    describe('MaxLength', () => {
        fit('Should be invalid', () => {
            const value = ['a', 'b', 'c', 'd'],
                expectedResult = { requiredLength: 3, actualLength: 4, value: value };

            formField.setValue(value);

            expect((formField.errors as ValidationErrors)[ValidationConstants.MAX_ARRAY_LENGTH_VALIDATOR_KEY]).toEqual(expectedResult);
        });

        fit('Should be valid', () => {
            formField.setValue(['a', 'b', 'c']);

            expect((formField.errors as ValidationErrors)[ValidationConstants.MAX_ARRAY_LENGTH_VALIDATOR_KEY]).toBeUndefined();
        });

        fit('Should be valid, when value is not array', () => {
            formField.setValue('a');

            expect((formField.errors as ValidationErrors)[ValidationConstants.MAX_ARRAY_LENGTH_VALIDATOR_KEY]).toBeUndefined();
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

            expect((formField.errors as ValidationErrors)[ValidationConstants.MIN_ARRAY_LENGTH_VALIDATOR_KEY]).toEqual(expectedResult);
        });

        fit('Should be valid', () => {
            formField.setValue(['a']);

            expect((formField.errors as ValidationErrors)[ValidationConstants.MIN_ARRAY_LENGTH_VALIDATOR_KEY]).toBeUndefined();
        });

        fit('Should be valid, when value is not array', () => {
            formField.setValue('a');

            expect((formField.errors as ValidationErrors)[ValidationConstants.MIN_ARRAY_LENGTH_VALIDATOR_KEY]).toBeUndefined();
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

            expect(component.form.valid).toBeFalse();
            expect(formField.valid).toBeFalse();
            expect((formField.errors as ValidationErrors)[ValidationConstants.MATCH_VALIDATOR_KEY]).toBeTrue();
        });

        fit('Should be valid', () => {
            compareField.setValue('123');
            formField.setValue('123');

            expect((formField.errors as ValidationErrors)[ValidationConstants.MATCH_VALIDATOR_KEY]).toBeUndefined();
        });
    });

    describe('CompareThan', () => {
        fit('Should be invalid', () => {
            formField.setValue(5);
            compareField.setValue(4);

            expect(component.form.valid).toBeFalse();
            expect(compareField.valid).toBeFalse();
            expect((compareField.errors as ValidationErrors)[ValidationConstants.COMPARE_THAN_VALIDATOR_KEY]).toBeTrue();
        });

        fit('Should be valid', () => {
            formField.setValue(4);
            compareField.setValue(5);

            expect(compareField.errors).toBeNull();
        });
    });
});