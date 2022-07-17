import { Component, DebugElement, OnInit, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { CommonConstants } from "ngx-sfc-common";
import { InputConstants } from "../../constants/input.constants";
import { InputReferenceDirective } from "./input-reference.directive";

@Component({
  template: `<form [formGroup]="formGroup">
                  <input sfcInput type="text" name="text-input" formControlName="input" >
             </form>`
})
class TestInputReferenceComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(public formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      input: ['', {
        validators: [Validators.maxLength(5)]
      }]
    });
  }

  @ViewChild(InputReferenceDirective, { static: false })
  public directive!: InputReferenceDirective;
}

describe('Directive: InputReference', () => {
  let component: TestInputReferenceComponent;
  let fixture: ComponentFixture<TestInputReferenceComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [InputReferenceDirective, TestInputReferenceComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputReferenceComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  describe('General', () => {
    fit('Should create an instance', () => {
      expect(component.directive).toBeTruthy();
    });

    fit('Should have static class', () => {
      expect(fixture.debugElement.query(By.css(`input.${InputConstants.INPUT_CLASS}`))).toBeTruthy();
    });
  });

  describe('Focus', () => {
    fit('Should handle focus event', () => {
      inputEl.triggerEventHandler('focus', null);
      fixture.detectChanges();

      expect(component.directive.isFocused).toBeTruthy();
    });

    fit('Should handle blur event', () => {
      inputEl.triggerEventHandler('focus', null);
      fixture.detectChanges();

      expect(component.directive.isFocused).toBeTruthy();

      inputEl.triggerEventHandler('blur', null);
      fixture.detectChanges();

      expect(component.directive.isFocused).toBeFalsy();
    });
  });

  describe('IsDirty property', () => {
    fit('Should be False by default', () => {
      expect(component.directive.isDirty).toBeFalsy();
    });

    fit('Should be True after change value', () => {
      inputEl.nativeElement.value = 'test value';
      inputEl.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.directive.isDirty).toBeTruthy();
    });
  });

  describe('Value property', () => {
    fit('Should be empty by default', () => {
      expect(component.directive.value).toEqual(CommonConstants.EMPTY_STRING);
    });

    fit('Should have value', () => {
      inputEl.nativeElement.value = 'test value';
      inputEl.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.directive.value).toEqual('test value');
    });
  });

  describe('HasValue property', () => {
    fit('Should be False by default', () => {
      expect(component.directive.hasValue).toBeFalsy();
    });

    fit('Should be True after set value', () => {
      inputEl.nativeElement.value = 'test value';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.directive.hasValue).toBeTruthy();
    });
  });

  describe('IsInvalid property', () => {
    fit('Should be False by default', () => {
      expect(component.directive.isInvalid).toBeFalsy();
    });

    fit('Should be False with defined value', () => {
      component.formGroup.controls['input'].setValue('test');

      expect(component.directive.isInvalid).toBeFalsy();
    });

    fit('Should be True after change to invalid value', () => {
      inputEl.nativeElement.value = 'test value';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.directive.isInvalid).toBeTruthy();
    });

    fit('Should be False after change to valid value', () => {
      inputEl.nativeElement.value = 'test';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.directive.isInvalid).toBeFalsy();
    });
  });

  describe('IsValid property', () => {
    fit('Should be False by default', () => {
      expect(component.directive.isValid).toBeTrue();
    });

    fit('Should be True after change to valid value', () => {
      inputEl.nativeElement.value = 'test';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.directive.isValid).toBeTrue();
    });
  });

  describe('Errors property', () => {
    fit('Should be null by default', () => {
      expect(component.directive.errors).toBeNull();
    });

    fit('Should have data after change to invalid value', () => {
      inputEl.nativeElement.value = 'test value';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.directive.errors).toBeDefined();
      expect((component.directive?.errors as any)['maxlength']).toBeDefined();
    });

    fit('Should be null after change to valid value', () => {
      inputEl.nativeElement.value = 'test';
      inputEl.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.directive.errors).toBeNull();
    });
  });
});