import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule, NgForm, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EqualOrIncludeValidatorDirective } from "./equal-or-include-validator.directive";
import { MaxArrayLengthValidatorDirective } from "./max-array-length-validator.directive";
import { MinArrayLengthValidatorDirective } from "./min-array-length-validator.directive";
import { TagsInputComponent } from "../../../components/tags/tags-input.component";
import { TagsChipComponent } from "../../../components/tags/parts/chip/tags-chip.component";
import { CloseComponent, ShowHideElementDirective } from "ngx-sfc-common";
import { TextInputComponent } from "../../../components/text/text-input.component";
import { MatchValidatorDirective } from "./match-validator.directive";
import { ValidationConstants } from "../../../constants/validation.constants";

@Component({
    template: `
      <form>
        <sfc-tags-input id="input" name="input" [(ngModel)]="tags" [sfcEqualOrInclude]="['a', 'b', 'c']" [sfcMaxArrayLength]="3" [sfcMinArrayLength]="1">
        </sfc-tags-input>
        <sfc-text-input id="compareValue" name="compareValue" ngModel></sfc-text-input>
        <sfc-text-input id="primaryValue" name="primaryValue" ngModel [sfcMatch]="'compareValue'"></sfc-text-input>
      </form>
    `
})
class TagsInputFormTemplateTestComponent {
    public tags: [] = [];
}

describe('Validators-TemplateForm: Common', () => {
    let fixture: ComponentFixture<TagsInputFormTemplateTestComponent>;
    let el: DebugElement;
    let debugEl: DebugElement;
    let form: NgForm;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, FontAwesomeModule, ReactiveFormsModule],
            declarations: [EqualOrIncludeValidatorDirective, MaxArrayLengthValidatorDirective, MinArrayLengthValidatorDirective, MatchValidatorDirective,
                TagsInputComponent, TagsChipComponent, CloseComponent, ShowHideElementDirective, TextInputComponent, TagsInputFormTemplateTestComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TagsInputFormTemplateTestComponent);
            el = fixture.debugElement;
            fixture.detectChanges();

            debugEl = el.query(By.css('sfc-tags-input input[type="text"]'));
            form = el.children[0].injector.get(NgForm);
        });
    }));

    describe('EqualOrInclude', () => {
        fit('Should be invalid', (() => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['d']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.EQUAL_OR_INCLUDE_VALIDATOR_KEY)).toBeTrue();
            expect((templateInputControl?.errors as ValidationErrors)[ValidationConstants.EQUAL_OR_INCLUDE_VALIDATOR_KEY]).toBeTrue();
            expect(templateInputControl?.valid).toBeFalse();
        }));

        fit('Should be valid', (() => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['a']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.EQUAL_OR_INCLUDE_VALIDATOR_KEY)).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
        }));
    });

    describe('MaxLength', () => {
        fit('Should be invalid', (() => {
            const value = ['a', 'b', 'c', 'd'],
                expectedResult = { requiredLength: 3, actualLength: 4, value: value },
                templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(value);
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.MAX_ARRAY_LENGTH_VALIDATOR_KEY)).toBeTrue();
            expect((templateInputControl?.errors as ValidationErrors)[ValidationConstants.MAX_ARRAY_LENGTH_VALIDATOR_KEY]).toEqual(expectedResult);
            expect(templateInputControl?.valid).toBeFalse();
        }));

        fit('Should be valid', (() => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['a', 'b', 'c']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.MAX_ARRAY_LENGTH_VALIDATOR_KEY)).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
        }));

        fit('Should be valid, when value is not array', () => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['a']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.MAX_ARRAY_LENGTH_VALIDATOR_KEY)).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
        });

        fit('Should be valid, when value is null', () => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(null);
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.MAX_ARRAY_LENGTH_VALIDATOR_KEY)).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
        });
    });

    describe('MinLength', () => {
        fit('Should be invalid', (() => {
            const value: any[] = [],
                expectedResult = { requiredLength: 1, actualLength: 0, value: value },
                templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(value);
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.MIN_ARRAY_LENGTH_VALIDATOR_KEY)).toBeTrue();
            expect((templateInputControl?.errors as ValidationErrors)[ValidationConstants.MIN_ARRAY_LENGTH_VALIDATOR_KEY]).toEqual(expectedResult);
            expect(templateInputControl?.valid).toBeFalse();
        }));

        fit('Should be valid', (() => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['a']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.MIN_ARRAY_LENGTH_VALIDATOR_KEY)).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
        }));

        fit('Should be valid, when value is not array', () => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['a']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.MIN_ARRAY_LENGTH_VALIDATOR_KEY)).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
        });

        fit('Should be valid, when value is null', () => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(null);
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.MIN_ARRAY_LENGTH_VALIDATOR_KEY)).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
        });
    });

    describe('Match', () => {
        fit('Should be invalid', (() => {
            const templateInputControl = form.control.get('primaryValue'),
                compareInputEl = el.query(By.css('input[type="text"][id="sfc-compareValue"]')),
                primaryInputEl = el.query(By.css('input[type="text"][id="sfc-primaryValue"]'));

            compareInputEl.componentInstance.ngControl.control.setValue('12');
            primaryInputEl.componentInstance.ngControl.control.setValue('123');
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.MATCH_VALIDATOR_KEY)).toBeTrue();
            expect((templateInputControl?.errors as ValidationErrors)[ValidationConstants.MATCH_VALIDATOR_KEY]).toBeTrue();
            expect(templateInputControl?.valid).toBeFalse();
        }));

        fit('Should be valid', (() => {
            const templateInputControl = form.control.get('primaryValue'),
                compareInputEl = el.query(By.css('input[type="text"][id="sfc-compareValue"]')),
                primaryInputEl = el.query(By.css('input[type="text"][id="sfc-primaryValue"]'));

            compareInputEl.componentInstance.ngControl.control.setValue('123');
            primaryInputEl.componentInstance.ngControl.control.setValue('123');
            fixture.detectChanges();

            expect(templateInputControl?.hasError(ValidationConstants.MATCH_VALIDATOR_KEY)).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
        }));
    });
});