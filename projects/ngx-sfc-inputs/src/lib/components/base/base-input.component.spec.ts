import { Component, DebugElement, OnInit, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ShowHideElementDirective, UIClass } from "ngx-sfc-common";
import { CommonConstants } from "ngx-sfc-common";
import { InputConstants } from "../../constants/input.constants";
import { InputReferenceDirective } from "../../directives/reference/input-reference.directive";
import { InputUIClass } from "../../enums/input-ui.enum";
import { TextInputComponent } from "../text/text-input.component";
import { BaseInputComponent } from "./base-input.component";

@Component({
    template: `<form [formGroup]="formGroup">
                    <sfc-text-input id="test-id" [icon]="faUser" formControlName="input"></sfc-text-input>
               </form>`
})
class TestBaseInputComponent implements OnInit {
    public formGroup!: FormGroup;

    faUser = faUser;

    constructor(public formBuilder: FormBuilder) { }
    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            input: [{ value: '', disabled: false }, {
                validators: [Validators.maxLength(5)]
            }]
        });
    }

    @ViewChild(TextInputComponent, { static: false })
    public textComponent!: TextInputComponent;

    public get base(): BaseInputComponent<string> {
        return this.textComponent as BaseInputComponent<string>;
    }
}

describe('Component: BaseInputComponent', () => {
    let component: TestBaseInputComponent;
    let fixture: ComponentFixture<TestBaseInputComponent>;
    let el: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, FontAwesomeModule],
            declarations: [ShowHideElementDirective, InputReferenceDirective, TextInputComponent, TestBaseInputComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestBaseInputComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component.base).toBeTruthy();
        });

        fit('Should have relevant input Id', () => {
            expect(component.base.inputId).toEqual(`${InputConstants.ID_PREFIX}test-id`);
        });

        fit('Should exist core elements', () => {
            expect(component.base.input).toBeTruthy();
            expect(component.base.inputElementRef).toBeTruthy();
        });
    });

    describe('Icon', () => {
        fit('Should not exist', () => {
            component.base.icon = null;
            fixture.detectChanges();

            expect(component.base.iconElementRef).toBeUndefined();
        });

        fit('Should exist', () => {
            component.base.icon = faUser;
            fixture.detectChanges();

            expect(component.base.iconElementRef).toBeTruthy();
        });

        fit('Should focus input', () => {
            spyOn(component.base.inputElementRef.nativeElement, 'focus');

            const inputEl = el.query(By.css('.icon'));
            inputEl.triggerEventHandler('click', null);
            fixture.detectChanges();

            expect(component.base.inputElementRef.nativeElement.focus).toHaveBeenCalled();
        });
    });

    describe('Label', () => {
        fit("Should be empty by default", () => {
            const labelEl = fixture.nativeElement.querySelector('label');
            expect(labelEl.className).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should be active when placeholder exist", () => {
            const labelEl = fixture.nativeElement.querySelector('label');
            component.textComponent.placeholder = 'test placeholder';
            fixture.detectChanges();

            expect(labelEl.className).toEqual(UIClass.Active);
        });

        fit("Should be active when input in focus", () => {
            const inputEl = el.query(By.css('input')),
                labelEl = fixture.nativeElement.querySelector('label');
            inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(labelEl.className).toEqual(UIClass.Active);
        });

        fit("Should be active when value defined", () => {
            const labelEl = fixture.nativeElement.querySelector('label');
            component.textComponent.writeValue('test value');
            fixture.detectChanges();

            expect(labelEl.className).toEqual(UIClass.Active);
        });
    });

    describe('Placeholder', () => {
        fit("Should be empty by default", () => {
            const inputEl = fixture.nativeElement.querySelector('input');
            expect(inputEl.placeholder).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should have value", () => {
            const placeholderAssertValue = "test placeholder",
                inputEl = fixture.nativeElement.querySelector('input');
            component.textComponent.placeholder = placeholderAssertValue;
            fixture.detectChanges();

            expect(inputEl.placeholder).toEqual(placeholderAssertValue);
        });

        fit("Should be empty when input focused", () => {
            const placeholderAssertValue = "test placeholder",
                inputEl = el.query(By.css('input'));
            component.textComponent.placeholder = placeholderAssertValue;
            inputEl.triggerEventHandler('focus', { target: inputEl.nativeElement });
            fixture.detectChanges();

            expect(inputEl.nativeElement.placeholder).toEqual(CommonConstants.EMPTY_STRING);
        });
    });

    describe('Helper text', () => {
        fit("Should be empty by default", () => {
            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should have value", () => {
            const helperTextAssertValue = 'test helper text';
            component.textComponent.helperText = helperTextAssertValue;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(helperTextAssertValue);
        });

        fit("Should have default validation message", () => {
            const helperTextAssertValue = 'test helper text',
                value = 'trigger input event',
                inputEl = el.query(By.css('input'));
            component.textComponent.helperText = helperTextAssertValue;
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: value } });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(InputConstants.DEFAULT_ERROR_MESSAGE);
        });

        fit("Should have custom validation message", () => {
            const helperTextAssertValue = 'test helper text',
                value = 'trigger input event',
                inputEl = el.query(By.css('input'));
            component.textComponent.helperText = helperTextAssertValue;
            component.textComponent.validations = { maxlength: 'Max length is not valid' }
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: value } });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual('Max length is not valid');
        });

        fit("Should have default validation message when custom not found", () => {
            const helperTextAssertValue = 'test helper text',
                value = 'trigger input event',
                inputEl = el.query(By.css('input'));
            component.textComponent.helperText = helperTextAssertValue;
            component.textComponent.validations = { required: 'Max length is not valid' }
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: value } });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.helper-text').innerText).toEqual(InputConstants.DEFAULT_ERROR_MESSAGE);
        });
    });

    describe('Validation errors', () => {
        fit("Should have only inner errors", () => {
            component.base.toggleInnerErrors('innerError', false);

            expect(component.base.validationErrors).toEqual({ innerError: true });
        });

        fit("Should have form error & inner error", () => {
            const inputEl = el.query(By.css('input'));
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 'trigger input event' } });
            fixture.detectChanges();

            component.base.toggleInnerErrors('innerError', false);

            expect(component.base.validationErrors).toEqual({
                maxlength: {
                    actualLength: 19,
                    requiredLength: 5
                }, innerError: true
            });
        });

        fit("Should clear inner errors", () => {
            component.base.toggleInnerErrors('innerError', false);
            component.base.clearInnerErrors();

            expect(component.base.validationErrors).toEqual({});
            expect(component.base.isValid).toBeTrue();
        });

        fit("Should remove inner error", () => {
            component.base.toggleInnerErrors('innerError', false);
            component.base.toggleInnerErrors('innerError', true);
            component.base.clearInnerErrors();

            expect(component.base.validationErrors).toEqual({});
            expect(component.base.isValid).toBeTrue();
        });
    });

    describe('Host classes', () => {
        fit("Should not have focused class", () => {
            expect(fixture.nativeElement.querySelector(`sfc-text-input.${UIClass.Focus}`)).toBeNull();
        });

        fit("Should have focused class", () => {
            const inputEl = el.query(By.css('input'));
            inputEl.triggerEventHandler('focus', null);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-text-input.${UIClass.Focus}`)).toBeTruthy();
        });

        fit("Should become unfocused", () => {
            const inputEl = el.query(By.css('input'));
            inputEl.triggerEventHandler('focus', null);
            fixture.detectChanges();

            inputEl.triggerEventHandler('blur', null);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-text-input.${UIClass.Focus}`)).toBeNull();
        });

        fit("Should not have hasIcon class", () => {
            component.base.icon = null;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-text-input.${InputUIClass.HasIcon}`)).toBeNull();
        });

        fit("Should have hasIcon class", () => {
            component.base.icon = faUser;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-text-input.${InputUIClass.HasIcon}`)).toBeTruthy();
        });

        fit("Should not have hasValue class", () => {
            expect(fixture.nativeElement.querySelector(`sfc-text-input.${InputUIClass.HasValue}`)).toBeNull();
        });

        fit("Should have hasValue class", () => {
            const inputEl = el.query(By.css('input'));
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 'trigger input event' } });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-text-input.${InputUIClass.HasValue}`)).toBeTruthy();
        });

        fit("Should not have disabled class", () => {
            expect(fixture.nativeElement.querySelector(`sfc-text-input.${UIClass.Disabled}`)).toBeNull();
        });

        fit('Should have disabled class', () => {
            component.base.disabled = true;
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-text-input.${UIClass.Disabled}`)).toBeTruthy();
        });

        fit("Should not have inner invalid class", () => {
            expect(fixture.nativeElement.querySelector(`sfc-text-input.${UIClass.InnerInvalid}`)).toBeNull();
        });

        fit("Should have inner invalid class", () => {
            component.base.toggleInnerErrors('innerError', false);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector(`sfc-text-input.${UIClass.InnerInvalid}`)).toBeTruthy();
        });
    });

    describe('Value', () => {
        fit('Should emit on writeValue', done => {
            const assertValue = 'test value';

            component.base.value$.subscribe(value => {
                expect(value).toEqual(assertValue);
                done();
            });

            component.base.writeValue(assertValue);
        });
    });
});