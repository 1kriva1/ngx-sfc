import { Component, DebugElement, OnInit, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { CommonConstants } from "ngx-sfc-common";
import { InputReferenceDirective } from "../../../directives/reference/input-reference.directive";
import { TextInputComponent } from "../../text/text-input.component";

@Component({
    template: `<form [formGroup]="formGroup">
                    <sfc-text-input id="test-id" formControlName="input"></sfc-text-input>
               </form>`
})
class TestBaseTextInputComponent implements OnInit {
    public formGroup!: FormGroup;

    constructor(public formBuilder: FormBuilder) { }
    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            input: ['', {
                validators: [Validators.maxLength(5), Validators.minLength(2), Validators.required]
            }]
        });
    }

    @ViewChild(TextInputComponent, { static: false })
    public textComponent!: TextInputComponent;
}

describe('Component: BaseTextInputComponent', () => {
    let component: TestBaseTextInputComponent;
    let fixture: ComponentFixture<TestBaseTextInputComponent>;
    let el: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [InputReferenceDirective, TextInputComponent, TestBaseTextInputComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestBaseTextInputComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
    });

    describe('General', () => {
        fit('Should create an instance', () => {
            expect(component.textComponent).toBeTruthy();
        });
    });

    describe('Required length', () => {
        fit("Should be hidden", () => {
            expect(fixture.nativeElement.querySelector('.right-side-info').hidden).toBeTrue();
        });

        fit("Should be hidden with valid value", () => {
            const inputEl = el.query(By.css('input'));
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 'test' } });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.right-side-info').hidden).toBeTrue();
        });

        fit("Should be hidden with invalid value, not related to length validation", () => {
            const inputEl = el.query(By.css('input'));
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: '' } });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.right-side-info').hidden).toBeTrue();
        });

        fit("Should not be hidden with invalid value (min length validation)", () => {
            const inputEl = el.query(By.css('input'));
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 't' } });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.right-side-info').hidden).toBeFalse();
        });

        fit("Should not be hidden with invalid value (max length validation)", () => {
            const inputEl = el.query(By.css('input'));
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 'test test' } });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.right-side-info').hidden).toBeFalse();
        });
    });

    describe('Characters counter', () => {
        fit("Should have default value", () => {
            expect(fixture.nativeElement.querySelector('.right-side-info').innerText).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should be empty for valid value", () => {
            const inputEl = el.query(By.css('input'));
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 'test' } });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.right-side-info').innerText).toEqual(CommonConstants.EMPTY_STRING);
        });

        fit("Should have value for invalid value (min length validation)", () => {
            const inputEl = el.query(By.css('input'));
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 't' } });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.right-side-info').innerText).toEqual('1/2');
        });

        fit("Should have value for invalid value (max length validation)", () => {
            const inputEl = el.query(By.css('input'));
            inputEl.triggerEventHandler('input', { target: { nativeElement: inputEl.nativeElement, value: 'test test' } });
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span.right-side-info').innerText).toEqual('9/5');
        });
    });
});