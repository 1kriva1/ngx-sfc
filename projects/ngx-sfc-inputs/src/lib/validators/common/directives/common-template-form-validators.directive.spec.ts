import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule, NgForm, ReactiveFormsModule, ValidationErrors } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EqualOrIncludeValidatorDirective } from "./equal-or-include-validator.directive";
import { MaxLengthValidatorDirective } from "./max-length-validator.directive";
import { MinLengthValidatorDirective } from "./min-length-validator.directive";
import { TagsInputComponent } from "../../../components/tags/tags-input.component";
import { TagsChipComponent } from "../../../components/tags/parts/chip/tags-chip.component";
import { CloseComponent } from "ngx-sfc-common";

@Component({
    template: `
      <form>
        <sfc-tags-input id="input" name="input" ngModel [sfcEqualOrInclude]="['a', 'b', 'c']" [sfcMaxLength]="3" [sfcMinLength]="1">
        </sfc-tags-input>
      </form>
    `
})
class TagsInputFormTemplateTestComponent {
}

describe('Validators-TemplateForm: Common', () => {
    let fixture: ComponentFixture<TagsInputFormTemplateTestComponent>;
    let el: DebugElement;
    let debugEl: DebugElement;
    let form: NgForm;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, FontAwesomeModule, ReactiveFormsModule],
            declarations: [EqualOrIncludeValidatorDirective, MaxLengthValidatorDirective, MinLengthValidatorDirective,
                TagsInputComponent, TagsChipComponent, CloseComponent, TagsInputFormTemplateTestComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TagsInputFormTemplateTestComponent);
            el = fixture.debugElement;
            fixture.detectChanges();

            debugEl = el.query(By.css('input[type="text"]'));
            form = el.children[0].injector.get(NgForm);
        });
    }));

    describe('EqualOrInclude', () => {
        fit('Should be invalid', (() => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['d']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError('sfcEqualOrInclude')).toBeTrue();
            expect((templateInputControl?.errors as ValidationErrors)['sfcEqualOrInclude']).toBeTrue();
            expect(templateInputControl?.valid).toBeFalse();
            expect(form.control.valid).toBeFalse();
        }));

        fit('Should be valid', (() => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['a']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError('sfcEqualOrInclude')).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));
    });

    describe('MaxLength', () => {
        fit('Should be invalid', (() => {
            const value = ['a', 'b', 'c', 'd'],
                expectedResult = { requiredLength: 3, actualLength: 4, value: value },
                templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(value);
            fixture.detectChanges();

            expect(templateInputControl?.hasError('sfcMaxLength')).toBeTrue();
            expect((templateInputControl?.errors as ValidationErrors)['sfcMaxLength']).toEqual(expectedResult);
            expect(templateInputControl?.valid).toBeFalse();
            expect(form.control.valid).toBeFalse();
        }));

        fit('Should be valid', (() => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['a', 'b', 'c']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError('sfcMaxLength')).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));

        fit('Should be valid, when value is not array', () => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['a']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError('sfcMaxLength')).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        });

        fit('Should be valid, when value is null', () => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(null);
            fixture.detectChanges();

            expect(templateInputControl?.hasError('sfcMaxLength')).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        });
    });

    describe('MinLength', () => {
        fit('Should be invalid', (() => {
            const value: any[] = [],
                expectedResult = { requiredLength: 1, actualLength: 0, value: value },
                templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(value);
            fixture.detectChanges();

            expect(templateInputControl?.hasError('sfcMinLength')).toBeTrue();
            expect((templateInputControl?.errors as ValidationErrors)['sfcMinLength']).toEqual(expectedResult);
            expect(templateInputControl?.valid).toBeFalse();
            expect(form.control.valid).toBeFalse();
        }));

        fit('Should be valid', (() => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['a']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError('sfcMinLength')).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        }));

        fit('Should be valid, when value is not array', () => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(['a']);
            fixture.detectChanges();

            expect(templateInputControl?.hasError('sfcMinLength')).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        });

        fit('Should be valid, when value is null', () => {
            const templateInputControl = form.control.get('input');

            debugEl.componentInstance.ngControl.control.setValue(null);
            fixture.detectChanges();

            expect(templateInputControl?.hasError('sfcMinLength')).toBeFalse();
            expect(templateInputControl?.errors).toBeNull();
            expect(templateInputControl?.valid).toBeTrue();
            expect(form.control.valid).toBeTrue();
        });
    });
});