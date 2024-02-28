import { Component, DebugElement, OnInit, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { InputReferenceDirective } from "../reference/input-reference.directive";
import { InputFocusDirective } from "./input-focus.directive";

@Component({
    template: `<form [formGroup]="formGroup">
                    <input sfcInput [sfcFocusInput]="focus" type="text" name="text-input" formControlName="input" >
               </form>`
})
class TestInputFocusComponent implements OnInit {
    public formGroup!: UntypedFormGroup;

    constructor(public formBuilder: UntypedFormBuilder) { }
    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            input: ['']
        });
    }

    @ViewChild(InputFocusDirective, { static: false })
    public directive!: InputFocusDirective;

    public focus: boolean = true;
}

describe('Directive: InputFocus', () => {
    let component: TestInputFocusComponent;
    let fixture: ComponentFixture<TestInputFocusComponent>;
    let inputEl: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule],
            declarations: [InputReferenceDirective, InputFocusDirective, TestInputFocusComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestInputFocusComponent);
        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('input'));
        fixture.detectChanges();
    });

    fit('Should create an instance', () => {
        expect(component.directive).toBeTruthy();
    });

    fit('Should input be focused', () => {
        expect(inputEl.nativeElement).toEqual(document.activeElement);
    });

    fit('Should call focus', () => {
        spyOn(inputEl.nativeElement, 'focus');

        component.focus = false;
        fixture.detectChanges();

        component.focus = true;
        fixture.detectChanges();

        expect(inputEl.nativeElement.focus).toHaveBeenCalledTimes(1);
    });
});